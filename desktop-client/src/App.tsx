import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Shield, ShieldAlert, Activity, Server, LogIn, Lock, Mail } from "lucide-react";

export default function App() {
    const [status, setStatus] = useState("disconnected");
    const [logs, setLogs] = useState<string[]>([]);

    // Auth state
    const [token, setToken] = useState<string | null>(localStorage.getItem('orbixa_token'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Fetch state
    const [servers, setServers] = useState<any[]>([]);
    const [selectedServer, setSelectedServer] = useState('');
    const [usage, setUsage] = useState({ down: "0 MB", up: "0 MB", ping: "-" });

    const API_URL = 'http://localhost:8080/api';

    useEffect(() => {
        if (token) {
            fetchServers();
            fetchUsage();
        }
    }, [token]);

    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                setToken(data.token);
                localStorage.setItem('orbixa_token', data.token);
                addLog('[SYSTEM] Successfully logged into Orbixa.');
            } else {
                setAuthError(data.message || 'Login failed');
            }
        } catch (err) {
            setAuthError('Connection to server failed');
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('orbixa_token');
        addLog('[SYSTEM] Logged out.');
    };

    const fetchServers = async () => {
        try {
            const res = await fetch(`${API_URL}/vpn/servers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setServers(data);
                if (data.length > 0) setSelectedServer(data[0].id);
            }
        } catch (e) {
            addLog('[ERROR] Failed to fetch servers.');
        }
    };

    const fetchUsage = async () => {
        try {
            const res = await fetch(`${API_URL}/vpn/usage`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUsage({
                    down: (data.downloaded / (1024 * 1024)).toFixed(2) + ' MB',
                    up: (data.uploaded / (1024 * 1024)).toFixed(2) + ' MB',
                    ping: '24ms' // Mock ping
                });
            }
        } catch (e) {
            // ignore
        }
    };

    const handleConnect = async () => {
        if (!selectedServer) {
            addLog('[ERROR] No server selected.');
            return;
        }

        setStatus("connecting");
        addLog(`[SYSTEM] Fetching VPN config for server...`);

        try {
            const res = await fetch(`${API_URL}/vpn/config?serverId=${selectedServer}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to get config');

            const data = await res.json();
            const vlessLink = data.link;

            let finalRes = "[XRAY] Connected via browser mock.";
            // @ts-ignore
            if (window.electronAPI) {
                // @ts-ignore
                finalRes = await window.electronAPI.connectVPN(vlessLink);
            }

            addLog(`[XRAY] ${finalRes}`);
            setStatus("connected");
        } catch (e: any) {
            addLog(`[ERROR] ${e.message}`);
            setStatus("error");
        }
    };

    const handleDisconnect = async () => {
        try {
            let res = "Disconnected via browser mock.";
            // @ts-ignore
            if (window.electronAPI) {
                // @ts-ignore
                res = await window.electronAPI.disconnectVPN();
            }
            addLog(`[XRAY] ${res}`);
            setStatus("disconnected");
        } catch (e) {
            console.error(e);
        }
    };

    if (!token) {
        return (
            <div className="bg-[#0a0a0f] text-white min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-sm bg-[#12121a] border border-gray-800 p-8 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    <div className="flex justify-center mb-6">
                        <Shield className="w-16 h-16 text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Orbixa Login</h2>
                    {authError && <div className="text-red-500 text-sm mb-4 text-center">{authError}</div>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="flex items-center bg-black/50 border border-gray-700 rounded px-3 py-2">
                            <Mail size={16} className="text-gray-500 mr-2" />
                            <input
                                type="email" placeholder="Email" required
                                className="bg-transparent border-none outline-none w-full text-sm"
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center bg-black/50 border border-gray-700 rounded px-3 py-2">
                            <Lock size={16} className="text-gray-500 mr-2" />
                            <input
                                type="password" placeholder="Password" required
                                className="bg-transparent border-none outline-none w-full text-sm"
                                value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#00E5FF] text-black font-bold py-2 rounded mt-2 hover:bg-cyan-300 transition-colors">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0f] text-white min-h-screen font-sans flex flex-col">
            <header className="flex justify-between items-center p-4 border-b border-gray-800">
                <h1 className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">Orbixa VPN</h1>
                <div className="flex items-center gap-4">
                    <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1">
                        <LogIn size={14} /> Logout
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="mb-8 w-64">
                    <label className="text-xs text-gray-500 mb-1 block">VPN Server Node</label>
                    <div className="flex items-center bg-[#12121a] border border-gray-800 rounded px-3 py-2">
                        <Server size={16} className="text-gray-400 mr-2" />
                        <select
                            className="bg-transparent border-none outline-none w-full text-sm text-white appearance-none"
                            value={selectedServer}
                            onChange={(e) => setSelectedServer(e.target.value)}
                            disabled={status === 'connected'}
                        >
                            {servers.length === 0 && <option value="">No servers available</option>}
                            {servers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.location})</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mb-12">
                    {status === 'connected' ? (
                        <Shield className="w-32 h-32 text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)] mb-6" />
                    ) : (
                        <ShieldAlert className="w-32 h-32 text-gray-600 mb-6" />
                    )}

                    <h2 className="text-2xl font-bold mb-2">
                        {status === 'connected' ? 'Secure Tunnel Active' : 'Unprotected Connection'}
                    </h2>
                    <p className="text-gray-400 text-sm">Target IP: {status === 'connected' ? servers.find(s => s.id === selectedServer)?.ipAddress : 'Visible'}</p>
                </div>

                {status === 'connected' ? (
                    <button
                        onClick={handleDisconnect}
                        className="w-64 py-4 rounded-full border border-red-500 text-red-500 font-bold hover:bg-red-500/10 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                    >
                        Disconnect
                    </button>
                ) : (
                    <button
                        onClick={handleConnect}
                        disabled={!selectedServer || status === 'connecting'}
                        className="w-64 py-4 rounded-full bg-[#00E5FF] text-black font-bold hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,229,255,0.6)] disabled:opacity-50"
                    >
                        {status === 'connecting' ? 'Connecting...' : 'Connect to Orbixa'}
                    </button>
                )}
            </main>

            <footer className="h-48 border-t border-gray-800 bg-[#12121a] p-4 flex gap-6">
                <div className="flex-1">
                    <h3 className="flex items-center gap-2 font-bold mb-2 text-sm text-gray-400">
                        <Activity size={16} /> Usage Stats
                    </h3>
                    <div className="text-sm">
                        <p className="flex justify-between py-1"><span className="text-gray-500">Down:</span> <span>{usage.down}</span></p>
                        <p className="flex justify-between py-1"><span className="text-gray-500">Up:</span> <span>{usage.up}</span></p>
                        <p className="flex justify-between py-1"><span className="text-gray-500">Ping:</span> <span className="text-green-400">{usage.ping}</span></p>
                    </div>
                </div>
                <div className="flex-1 border-l border-gray-800 pl-6 flex flex-col">
                    <h3 className="font-bold mb-2 text-sm text-gray-400">Connection Logs</h3>
                    <div className="flex-1 bg-black/40 rounded p-2 text-xs font-mono text-gray-400 overflow-y-auto">
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1">{log}</div>
                        ))}
                        {logs.length === 0 && <span className="text-gray-600 italic">No logs yet...</span>}
                    </div>
                </div>
            </footer>
        </div>
    );
}
