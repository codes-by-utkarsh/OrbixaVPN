mod xray;

use std::process::{Child, Stdio};
use std::sync::Mutex;
use tauri::{State, Manager, Emitter};
use xray::{parse_vless_link, generate_xray_config, VlessConfig};
use std::io::{Write, BufReader, BufRead};
use std::fs::File;

struct AppState {
    child: Mutex<Option<Child>>,
    current_config: Mutex<Option<VlessConfig>>,
}

#[tauri::command]
async fn toggle_vpn(app: tauri::AppHandle, state: State<'_, AppState>, active: bool) -> Result<String, String> {
    let mut child_guard = state.child.lock().unwrap();
    
    if active {
        if child_guard.is_some() {
            return Ok("Already Connected".to_string());
        }

        let config_guard = state.current_config.lock().unwrap();
        let config = config_guard.as_ref().ok_or("No configuration found")?;

        let xray_config = generate_xray_config(config, 10808);
        let config_path = "xray_config.json";
        let mut file = File::create(config_path).map_err(|e| e.to_string())?;
        file.write_all(serde_json::to_string_pretty(&xray_config).unwrap().as_bytes()).map_err(|e| e.to_string())?;

        let mut child = std::process::Command::new("xray")
            .arg("run")
            .arg("-config")
            .arg(config_path)
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .spawn()
            .map_err(|_| "Failed to start Xray bin. Ensure it is in PATH.")?;

        let stdout = child.stdout.take().unwrap();
        let stderr = child.stderr.take().unwrap();
        let app_handle = app.clone();

        // Spawn logger task
        tokio::spawn(async move {
            let reader = BufReader::new(stdout);
            for line in reader.lines() {
                if let Ok(l) = line {
                    let _ = app_handle.emit("vpn-log", l);
                }
            }
        });
        
        let app_handle_err = app.clone();
        tokio::spawn(async move {
            let reader = BufReader::new(stderr);
            for line in reader.lines() {
                if let Ok(l) = line {
                    let _ = app_handle_err.emit("vpn-log", format!("ERR: {}", l));
                }
            }
        });

        *child_guard = Some(child);
        Ok("Connected".to_string())
    } else {
        if let Some(mut child) = child_guard.take() {
            let _ = child.kill();
        }
        Ok("Disconnected".to_string())
    }
}

#[tauri::command]
fn parse_vless(state: State<'_, AppState>, link: String) -> Result<serde_json::Value, String> {
    let config = parse_vless_link(&link)?;
    let mut config_guard = state.current_config.lock().unwrap();
    *config_guard = Some(config.clone());
    
    Ok(serde_json::to_value(config).unwrap())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(AppState {
            child: Mutex::new(None),
            current_config: Mutex::new(None),
        })
        .invoke_handler(tauri::generate_handler![toggle_vpn, parse_vless])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
