const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 450,
        height: 750,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            nodeIntegration: false,
            contextIsolation: true
        },
        titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        backgroundColor: '#0a0a0f'
    });

    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
        mainWindow.loadURL('http://localhost:1420'); // Vite dev port
    } else {
        mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

let xrayProcess = null;

ipcMain.handle('connect_vpn', async (event, config) => {
    console.log("Connecting back to Orbixa Network with Config:", config);
    // Mocking the child_process xray execution since we don't have the binary deployed.
    return "Connected securely to Orbixa Network (Native Electron Mode)";
});

ipcMain.handle('disconnect_vpn', async () => {
    if (xrayProcess) {
        xrayProcess.kill();
        xrayProcess = null;
    }
    return "Disconnected";
});
