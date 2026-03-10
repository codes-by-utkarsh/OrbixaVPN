// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tokio::process::Command;

#[tauri::command]
async fn connect_vpn(vless_link: String) -> Result<String, String> {
    // In a real implementation:
    // 1. Parse the VLESS link or JSON config.
    // 2. Write it to a temporary config file.
    // 3. Start the bundled Xray-core executable with this config.
    // 4. Setup system proxy/tun interfaces to route traffic.
    
    // Mock simulation:
    println!("Connecting to VLESS link: {}", vless_link);
    Ok("Connected securely to Orbixa Network".into())
}

#[tauri::command]
async fn disconnect_vpn() -> Result<String, String> {
    // Mock simulation:
    // Terminate Xray-core process and reset system proxy.
    Ok("Disconnected".into())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![connect_vpn, disconnect_vpn])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
