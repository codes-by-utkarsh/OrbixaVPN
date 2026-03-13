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

    const copyToClipboard = () => {
        if (profile?.uuid) {
            const locationPart = (servers[0]?.location || 'Mumbai').split(',')[0].trim().replace(/\s+/g, '-');
            const link = `vless://${profile.uuid}@${servers[0]?.host || 'in1.orbixa.0xutkarsh.tech'}:443?type=ws&security=tls&path=/orbixa#Orbixa-${locationPart}`;
            navigator.clipboard.writeText(link);
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
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Key className="text-primary" size={24} />
                                </div>
                                <span className="text-gray-400 text-sm font-medium">Orbixa Node Key</span>
                            </div>
                            <button
                                onClick={async () => {
                                    const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn-working.onrender.com/api';
                                    const token = localStorage.getItem('orbixa_token');
                                    try {
                                        const res = await fetch(`${api_url}/vpn/sync`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
                                        const text = await res.text();
                                        let data;
                                        try {
                                            data = JSON.parse(text);
                                        } catch (e) {
                                            console.error('Raw response:', text);
                                            alert(`Server Error: ${res.status} - The backend sent a non-JSON response. Check Render logs.`);
                                            return;
                                        }

                                        if (res.ok) {
                                            alert(`Sync Successful: ${data.message}`);
                                        } else {
                                            alert(`Sync Failed: ${data.message}`);
                                        }
                                    } catch (e) { alert('Network error during sync. Is the backend awake?'); }
                                }}
                                title="Force Sync to Server"
                                className="p-2 hover:bg-surface rounded-lg transition-all text-primary"
                            >
                                <RefreshCcw size={16} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 bg-background/50 p-2 rounded-lg border border-border group hover:border-primary/50 transition-all">
                            <span className="text-[10px] font-mono text-primary-light truncate flex-1">
                                {profile?.uuid ? `vless://${profile.uuid}@${servers[0]?.host || 'in1.orbixa.0xutkarsh.tech'}:443?type=ws&security=tls&path=/orbixa#Orbixa-${(servers[0]?.location || 'Mumbai').split(',')[0].trim().replace(/\s+/g, '-')}` : 'Generating Key...'}
                            </span>
                            <button
                                onClick={copyToClipboard}
                                className="text-primary hover:text-white transition-colors p-1"
                                title="Copy Master Key"
                            >
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Server List - Wider layout since sidebar is gone */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <Globe className="text-primary" /> Active Nodes
                            </h3>
                            <div className="text-xs text-gray-500 bg-surface px-3 py-1 rounded-full border border-border">
                                {servers.length} Nodes Online
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {servers.map((server: any) => (
                                <div key={server._id} className="premium-border p-6 bg-surface/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-surface/40 transition-all group">
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
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest whitespace-nowrap">Latency</span>
                                            <span className="text-primary-light font-bold">{server.ping}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest whitespace-nowrap">Load</span>
                                            <span className="text-white font-bold">{server.load}</span>
                                        </div>
                                        <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                                            <Zap size={20} className="text-primary" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Simple Sidebar with Download Only */}
                    <div className="space-y-8">
                        {/* Download App Box */}
                        <div className="bg-primary p-1 rounded-3xl shadow-glow">
                            <div className="bg-surface rounded-[calc(1.5rem-2px)] p-8 text-center space-y-6">
                                <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
                                    <Shield className="text-primary" size={40} />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-2xl font-bold mb-2">Recommended Client</h4>
                                    <p className="text-gray-500 text-sm">Download **v2rayN-With-Core.zip** from GitHub. Import your Master Key above to connect.</p>
                                </div>
                                <a
                                    href="https://github.com/2dust/v2rayN/releases/download/7.17.3/v2rayN-windows-64-desktop.zip"
                                    className="btn-primary w-full py-4 shadow-accent-glow flex items-center justify-center gap-2"
                                >
                                    <Download size={20} /> Download v2rayN
                                </a>
                                <p className="text-[10px] text-gray-600 mt-2 italic">*Standalone Orbixa Client coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
