#!/bin/bash

# ==============================================================================
# Orbixa VPN - Node Deployment Script
# Description: Installs and configures Xray-core on a fresh Ubuntu 22.04+ VPS.
# Run this on the target VPS as root.
# Usage: ./deploy_node.sh
# ==============================================================================

set -e

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}   Orbixa VPN - Server Node Installer  ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Ensure running as root
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Please run as root (sudo ./deploy_node.sh)${NC}"
  exit 1
fi

echo -e "\n${GREEN}[1/8] Updating system packages...${NC}"
apt update && apt upgrade -y
apt install -y curl wget unzip tar jq ufw certbot

echo -e "\n${GREEN}[2/8] Fetching Xray-core installation script...${NC}"
# Official XTLS script for safe installation of Xray
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install

echo -e "\n${GREEN}[3/8] Resolving Domain & Certificates...${NC}"
read -p "Enter the domain name for this node (e.g. de1.orbixavpn.com): " NODE_DOMAIN
read -p "Enter an email for Let's Encrypt SSL recovery: " SSL_EMAIL

# Open ports for Certbot & Xray
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp

# Stop any service on port 80 just in case
systemctl stop nginx 2>/dev/null || true

# Generate SSL Certificate
certbot certonly --standalone --agree-tos --no-eff-email -m $SSL_EMAIL -d $NODE_DOMAIN

# Map certificate paths
CERT_PATH="/etc/letsencrypt/live/$NODE_DOMAIN/fullchain.pem"
KEY_PATH="/etc/letsencrypt/live/$NODE_DOMAIN/privkey.pem"

echo -e "\n${GREEN}[4/8] Generating Orbixa Base Configuration...${NC}"
# Default admin UUID so the server has at least one valid connection string initially
ADMIN_UUID=$(xray uuid)

cat << EOF > /usr/local/etc/xray/config.json
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 443,
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": "$ADMIN_UUID",
            "flow": "xtls-rprx-vision"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "ws",
        "security": "tls",
        "tlsSettings": {
          "certificates": [
            {
              "certificateFile": "$CERT_PATH",
              "keyFile": "$KEY_PATH"
            }
          ]
        },
        "wsSettings": {
          "path": "/orbixa"
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    }
  ]
}
EOF

echo -e "\n${GREEN}[5/8] Securing Server Firewall (UFW)...${NC}"
ufw --force enable

echo -e "\n${GREEN}[6/8] Restarting Xray Service...${NC}"
systemctl restart xray
systemctl enable xray

echo -e "\n${BLUE}=================================================${NC}"
echo -e "${GREEN}Orbixa Node Successfully Deployed!${NC}"
echo -e "${BLUE}=================================================${NC}"
echo -e "Node Domain: ${GREEN}$NODE_DOMAIN${NC}"
echo -e "Base UUID: ${GREEN}$ADMIN_UUID${NC}"
echo -e ""
echo -e "To add this node to the Orbixa Admin Panel, use the following payload values:"
echo -e "Domain: $NODE_DOMAIN"
echo -e "Port: 443"
echo -e "================================================="
