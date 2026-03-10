const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    connectVPN: (config) => ipcRenderer.invoke('connect_vpn', config),
    disconnectVPN: () => ipcRenderer.invoke('disconnect_vpn')
});
