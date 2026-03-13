# Orbixa VPN Desktop

## Development Setup

### 🔧 Prerequisites (Windows)
To compile the native Rust backend, you **must** have the C++ Build Tools installed. 

1.  Download the [Visual Studio Installer](https://visualstudio.microsoft.com/downloads/).
2.  Install the **"Desktop development with C++"** workload.
3.  Ensure "MSVC v143" (or later) and "Windows SDK" are checked.

### 🚀 Running the App
Once the build tools are installed:
```bash
npm run tauri dev
```

### 🎨 Web Preview
If you just want to see the UI without Rust:
```bash
npm run dev
```
Then open `http://localhost:1420`.
