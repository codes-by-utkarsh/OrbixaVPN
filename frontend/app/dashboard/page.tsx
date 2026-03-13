'use client';

import { useEffect, useState } from 'react';
import {
    Activity, Radio, HardDrive, Shield, Download,
    Server, Globe, Key, Copy, Check, LogOut,
    RefreshCcw, Wifi, MapPin, Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [profile, setProfile] = useState<any>(null);
    const [usage, setUsage] = useState<any>({ downloaded: 1240, uploaded: 450, limit: 10000 });
    const [servers, setServers] = useState<any[]>([
        { id: '1', name: 'Orbixa-Mumbai-01', location: 'Mumbai, India', status: 'online', ping: '24ms', load: '12%' }
    ]);
    const [selectedConfig, setSelectedConfig] = useState<{ link: string, serverName: string } | null>(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('orbixa_token');
        if (!token) {
            // In a real app, redirect to login
            // router.push('/login');
        }

        const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn-working.onrender.com/api';

        try {
            const profileRes = await fetch(`${api_url}/auth/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (profileRes.ok) {
                const data = await profileRes.json();
                setProfile(data);
            } else {
                router.push('/login');
            }

            const usageRes = await fetch(`${api_url}/vpn/usage`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (usageRes.ok) setUsage(await usageRes.json());

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
        setLoading(true);
        const token = localStorage.getItem('orbixa_token');
        const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn-working.onrender.com/api';

        try {
            const res = await fetch(`${api_url}/vpn/config?serverId=${serverId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setSelectedConfig({ link: data.link, serverName });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (selectedConfig) {
            navigator.clipboard.writeText(selectedConfig.link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('orbixa_token');
        router.push('/login');
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold italic tracking-tight mb-2">
                            Dashboard
                        </h2>
                        <p className="text-gray-400">Welcome back, <span className="text-primary font-medium">{profile?.email || 'Loading...'}</span></p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={fetchDashboardData}
                            className="p-3 bg-surface border border-border rounded-xl hover:bg-secondary transition-all"
                        >
                            <RefreshCcw size={20} className="text-gray-400" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="btn-secondary px-5 py-3 flex items-center gap-2 text-red-400 hover:text-red-300 hover:border-red-400/50"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="premium-border bg-surface/30 p-6 rounded-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-500/10 rounded-xl">
                                <Radio className="text-green-500" size={24} />
                            </div>
                            <span className="text-gray-400 text-sm font-medium">Network Status</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <h3 className="text-2xl font-bold text-green-500">SECURE</h3>
                            <span className="text-xs text-green-500/50 mb-1 font-mono">Real-time encryption active</span>
                        </div>
                    </div>

                    <div className="premium-border bg-surface/30 p-6 rounded-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Download className="text-primary" size={24} />
                            </div>
                            <span className="text-gray-400 text-sm font-medium">Total Downloaded</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <h3 className="text-2xl font-bold">{usage.downloaded} <span className="text-sm font-normal text-gray-500">MB</span></h3>
                        </div>
                    </div>

                    <div className="premium-border bg-surface/30 p-6 rounded-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-accent-purple/10 rounded-xl">
                                <Zap className="text-primary-light" size={24} />
                            </div>
                            <span className="text-gray-400 text-sm font-medium">Subscription</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <h3 className="text-2xl font-bold text-gradient">{profile?.plan || 'PRO'}</h3>
                            <span className="text-xs text-gray-500 mb-1">Renews in 12 days</span>
                        </div>
                    </div>

                    <div className="premium-border bg-surface/30 p-6 rounded-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Key className="text-primary" size={24} />
                            </div>
                            <span className="text-gray-400 text-sm font-medium">Orbixa Node Key</span>
                        </div>
                        <div className="flex items-center gap-2 bg-background/50 p-2 rounded-lg border border-border group hover:border-primary/50 transition-all">
                            <span className="text-[10px] font-mono text-primary-light truncate flex-1">
                                {profile?.uuid ? `vless://${profile.uuid}@${servers[0]?.host || 'in1.orbixa.0xutkarsh.tech'}:443?type=ws&security=tls&path=/orbixa#OrbixaMaster` : 'Generating Key...'}
                            </span>
                            <button
                                onClick={() => {
                                    if (!profile?.uuid) return;
                                    const link = `vless://${profile.uuid}@${servers[0]?.host || 'in1.orbixa.0xutkarsh.tech'}:443?type=ws&security=tls&path=/orbixa#OrbixaMaster`;
                                    navigator.clipboard.writeText(link);
                                    alert('Master VLESS Link copied!');
                                }}
                                className="text-primary hover:text-white transition-colors"
                            >
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Server List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <Globe className="text-primary" /> Active Nodes
                            </h3>
                            <div className="text-xs text-gray-500 bg-surface px-3 py-1 rounded-full border border-border">
                                {servers.length} Nodes Online
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {servers.map(server => (
                                <div key={server.id} className="premium-border p-6 bg-surface/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-surface/40 transition-all group">
                                    <div className="flex items-center gap-5 w-full md:w-auto">
                                        <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center group-hover:border-primary/50 transition-all">
                                            <MapPin size={32} className="text-gray-500 group-hover:text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-xl">{server.location}</h4>
                                                <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider rounded border border-green-500/20">Active</span>
                                            </div>
                                            <p className="text-sm text-gray-500 font-mono tracking-tighter">{server.name} • <span className="text-primary-light">VLESS-Reality</span></p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                        <div className="hidden sm:flex flex-col items-end">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest whitespace-nowrap">Latency</span>
                                            <span className="text-primary-light font-bold">{server.ping}</span>
                                        </div>
                                        <div className="hidden sm:flex flex-col items-end">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest whitespace-nowrap">Load</span>
                                            <span className="text-white font-bold">{server.load}</span>
                                        </div>
                                        <button
                                            onClick={() => handleConnect(server.id, server.location)}
                                            disabled={loading}
                                            className="btn-primary py-3 px-8 text-sm whitespace-nowrap hover:shadow-glow"
                                        >
                                            {loading ? <RefreshCcw size={18} className="animate-spin" /> : "Get Config"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Access Sidebar */}
                    <div className="space-y-8">
                        {/* Config Output Box */}
                        <div className="premium-border bg-background p-8 rounded-3xl relative overflow-hidden min-h-[350px] flex flex-col">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>

                            {!selectedConfig ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-surface border border-border rounded-2xl flex items-center justify-center overflow-hidden p-2">
                                        <img src="/logo.png" alt="Orbixa" className="w-full h-full object-cover rounded-lg opacity-50" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Ready to Secure</h4>
                                        <p className="text-gray-500 text-sm">Select a server to generate your professional VLESS authentication string.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="font-bold text-gray-300 uppercase tracking-widest text-xs">Generated Config</h4>
                                        <button onClick={() => setSelectedConfig(null)} className="text-red-400 hover:text-red-300 text-[10px] font-bold uppercase tracking-widest">Clear</button>
                                    </div>

                                    <div className="bg-surface border border-border rounded-2xl p-5 mb-8 relative group cursor-pointer overflow-hidden" onClick={copyToClipboard}>
                                        <p className="text-[11px] font-mono text-primary-light break-all leading-relaxed line-clamp-4">
                                            {selectedConfig.link}
                                        </p>
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <span className="bg-primary text-black px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2">
                                                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'COPIED' : 'CLICK TO COPY'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Deployment Steps:</h5>
                                        <div className="space-y-3">
                                            {[
                                                "Copy the URI above",
                                                "Open Orbixa for Windows/Android",
                                                "Import from Clipboard",
                                                "Initiate Secure Connection"
                                            ].map((step, i) => (
                                                <div key={i} className="flex gap-3">
                                                    <span className="text-primary font-bold">{i + 1}.</span>
                                                    <span className="text-gray-400 text-xs">{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Download App Box */}
                        <div className="bg-primary p-1 rounded-3xl shadow-glow">
                            <div className="bg-surface rounded-[calc(1.5rem-2px)] p-8 text-center space-y-6">
                                <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
                                    <HardDrive className="text-primary" size={40} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold mb-2">Desktop Client</h4>
                                    <p className="text-gray-500 text-sm">Download our native Windows executable for maximum performance.</p>
                                </div>
                                <a
                                    href="/orbixa-desktop Setup 1.0.0.exe"
                                    download
                                    className="btn-primary w-full py-4 shadow-accent-glow"
                                >
                                    <Download size={20} /> Download v1.0.4
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
