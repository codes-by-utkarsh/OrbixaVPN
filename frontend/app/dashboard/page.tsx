'use client';

import { useEffect, useState } from 'react';
import { Activity, Radio, HardDrive, Shield, Download, Server, Globe, Key, Copy, Check } from 'lucide-react';

export default function Dashboard() {
    const [profile, setProfile] = useState<any>(null);
    const [usage, setUsage] = useState<any>(null);

    const [servers, setServers] = useState<any[]>([]);
    const [selectedConfig, setSelectedConfig] = useState<{ link: string, serverName: string } | null>(null);
    const [copied, setCopied] = useState(false);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('orbixa_token');
        if (!token) {
            window.location.href = '/login';
            return;
        }

        const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn.onrender.com/api';

        try {
            // Fetch User Data
            const profileRes = await fetch(`${api_url}/auth/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (profileRes.ok) setProfile(await profileRes.json());

            // Fetch Usage Data
            const usageRes = await fetch(`${api_url}/vpn/usage`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (usageRes.ok) setUsage(await usageRes.json());

            // Fetch Servers
            const serversRes = await fetch(`${api_url}/vpn/servers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (serversRes.ok) setServers(await serversRes.json());
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleConnect = async (serverId: string, serverName: string) => {
        const token = localStorage.getItem('orbixa_token');
        const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn.onrender.com/api';

        try {
            const res = await fetch(`${api_url}/vpn/config?serverId=${serverId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setSelectedConfig({ link: data.link, serverName });
            } else {
                alert("Failed to get VPN config. Make sure your account is active.");
            }
        } catch (e) {
            alert("Connection error.");
        }
    };

    const copyToClipboard = () => {
        if (selectedConfig) {
            navigator.clipboard.writeText(selectedConfig.link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 italic">Welcome, {profile?.email || 'User'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                            <Radio className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Connection Status</p>
                            <p className="text-xl font-bold text-green-500">Secure</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                            <Activity className="text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Orbixa ID (UUID)</p>
                            <p className="text-xs font-mono drop-shadow-glow break-all">{profile?.uuid || 'Loading...'}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                            <HardDrive className="text-purple-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Bandwidth Usage</p>
                            <p className="text-xl font-bold">{usage ? `${usage.downloaded} MB` : '...'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Server Selection */}
                <div className="bg-card rounded-xl border border-gray-800 p-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Globe className="text-primary" /> Available VPN Regions
                    </h3>
                    <div className="space-y-4">
                        {servers.map(server => (
                            <div key={server.id} className="flex items-center justify-between p-4 bg-background border border-gray-800 rounded-xl hover:border-primary/50 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-700">
                                        <Server size={20} className="text-gray-400 group-hover:text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{server.location}</p>
                                        <p className="text-xs text-gray-500">{server.name} • {server.status}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleConnect(server.id, server.location)}
                                    className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold border border-primary/20 hover:bg-primary hover:text-black transition-all"
                                >
                                    Get Config
                                </button>
                            </div>
                        ))}
                        {servers.length === 0 && <p className="text-gray-500 text-center py-8">No servers available at the moment.</p>}
                    </div>
                </div>

                {/* Connection Details / Config Output */}
                <div className="bg-card rounded-xl border border-gray-800 p-6 flex flex-col items-center justify-center text-center">
                    {!selectedConfig ? (
                        <div className="py-12">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                <Key className="text-primary" size={32} />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">Ready to Connect</h4>
                            <p className="text-sm text-gray-400">Select a server from the list to generate your unique VPN access link.</p>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    Configuration for {selectedConfig.serverName}
                                </h4>
                                <button onClick={() => setSelectedConfig(null)} className="text-xs text-gray-500 hover:text-white">Clear</button>
                            </div>

                            <div className="bg-black/50 border border-gray-800 rounded-xl p-4 mb-6 relative group">
                                <p className="text-xs text-gray-400 font-mono break-all text-left pr-10">
                                    {selectedConfig.link}
                                </p>
                                <button
                                    onClick={copyToClipboard}
                                    className="absolute top-4 right-4 p-2 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-black transition-all"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>

                            <div className="text-left space-y-4">
                                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">How to use:</h5>
                                <ol className="text-sm text-gray-400 space-y-2 list-decimal ml-4">
                                    <li>Copy the VLESS link above.</li>
                                    <li>Open your VPN client (v2rayNG, Nekoray, or Orbixa App).</li>
                                    <li>Import from clipboard.</li>
                                    <li>Click connect and enjoy secure browsing.</li>
                                </ol>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-card rounded-xl border border-gray-800 p-8 flex flex-col items-center justify-center min-h-[300px]">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="text-primary" /> Download the Orbixa Desktop App
                </h3>
                <p className="text-gray-400 mb-8 text-center max-w-lg">
                    Connect to our high-speed global nodes with a single click. Download the fully compiled Windows executable to access the Orbixa network locally.
                </p>
                <a href="/orbixa-desktop Setup 1.0.0.exe" download className="bg-primary/10 border-2 border-primary hover:bg-primary transition-all group shadow-glow rounded-xl p-4 flex flex-col items-center max-w-[250px]">
                    <Download className="text-primary group-hover:text-black mb-2 animate-bounce" size={40} />
                    <span className="text-primary group-hover:text-black font-bold text-center block">Download for Windows (.exe)</span>
                </a>
            </div>
        </div>
    )
}
