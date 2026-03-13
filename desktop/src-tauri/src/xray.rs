use serde::{Deserialize, Serialize};
use url::Url;
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VlessConfig {
    pub uuid: String,
    pub address: String,
    pub port: u16,
    pub sni: String,
    pub path: String,
    pub security: String,
    pub transport: String,
    pub host: String,
}

pub fn parse_vless_link(link: &str) -> Result<VlessConfig, String> {
    let url = Url::parse(link).map_err(|e| e.to_string())?;
    
    if url.scheme() != "vless" {
        return Err("Not a VLESS link".to_string());
    }

    let uuid = url.username().to_string();
    let address = url.host_str().ok_or("Missing address")?.to_string();
    let port = url.port().unwrap_or(443);
    
    let query: HashMap<String, String> = url.query_pairs().into_owned().collect();
    
    let security = query.get("security").cloned().unwrap_or_else(|| "none".to_string());
    let transport = query.get("type").cloned().unwrap_or_else(|| "tcp".to_string());
    let sni = query.get("sni").cloned().unwrap_or_else(|| address.clone());
    let path = query.get("path").cloned().unwrap_or_else(|| "/".to_string());
    let host = query.get("host").cloned().unwrap_or_else(|| "".to_string());

    Ok(VlessConfig {
        uuid,
        address,
        port,
        sni,
        path,
        security,
        transport,
        host,
    })
}

pub fn generate_xray_config(config: &VlessConfig, local_port: u16) -> serde_json::Value {
    serde_json::json!({
        "log": {
            "loglevel": "warning"
        },
        "inbounds": [
            {
                "port": local_port,
                "listen": "127.0.0.1",
                "protocol": "socks",
                "settings": {
                    "auth": "noauth",
                    "udp": true
                }
            }
        ],
        "outbounds": [
            {
                "protocol": "vless",
                "settings": {
                    "vnext": [
                        {
                            "address": config.address,
                            "port": config.port,
                            "users": [
                                {
                                    "id": config.uuid,
                                    "encryption": "none"
                                }
                            ]
                        }
                    ]
                },
                "streamSettings": {
                    "network": config.transport,
                    "security": config.security,
                    "tlsSettings": {
                        "serverName": config.sni,
                        "allowInsecure": false
                    },
                    "wsSettings": {
                        "path": config.path,
                        "headers": {
                            "Host": config.host
                        }
                    }
                }
            }
        ]
    })
}
