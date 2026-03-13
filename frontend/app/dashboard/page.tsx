'use client';

import { useEffect, useState } from 'react';
import {
    Activity, Radio, HardDrive, Shield, Download,
    Server, Globe, Key, Copy, Check, LogOut,
    RefreshCcw, Wifi, MapPin, Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
    const [profile, setProfile] = useState<any>(null);
    const [usage, setUsage] = useState<any>({ downloaded: 1240, uploaded: 450, limit: 10000 });
    const [servers, setServers] = useState<any[]>([
        { id: '1', name: 'Orbixa-Mumbai-01', location: 'Mumbai, India', status: 'online', ping: '24ms', load: '12%' }
    ]);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('orbixa_token');
        if (!token) router.push('/login');

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

    const handleSubscribe = async (plan: string) => {
        const token = localStorage.getItem('orbixa_token');
        const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn-working.onrender.com/api';

        try {
            const res = await fetch(`${api_url}/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ planId: plan })
            });

            const order = await res.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Frontend needs the Key ID
                amount: order.amount,
                currency: order.currency,
                name: "Orbixa VPN",
                description: `Upgrade to ${plan.toUpperCase()}`,
                order_id: order.id,
                handler: async function (response: any) {
                    const verifyRes = await fetch(`${api_url}/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            ...response,
                            planId: plan
                        })
                    });

                    if (verifyRes.ok) {
                        alert('Payment successful! Access granted.');
                        fetchDashboardData();
                    } else {
                        alert('Verification failed. Please contact support.');
                    }
                },
                prefill: {
                    email: profile?.email
                },
                theme: {
                    color: "#00f2ff"
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (err) {
            alert('An error occurred during payment initialization.');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background text-foreground relative overflow-hidden">
            {/* Cyber Glows */}
            <div className="cyber-glow top-0 right-0 w-[500px] h-[500px] bg-primary/10" />
            <div className="cyber-glow bottom-0 left-0 w-[600px] h-[600px] bg-accent-purple/5" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                    <div>
                        <h2 className="text-5xl font-black italic tracking-tighter mb-2 uppercase">
                            Console
                        </h2>
                        <p className="text-gray-500 font-medium">Identity: <span className="text-primary-light font-bold">{(profile?.email || 'Loading...').split('@')[0]}</span></p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={fetchDashboardData}
                            className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-gray-400"
                        >
                            <RefreshCcw size={20} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 border border-red-500/10"
                        >
                            <LogOut size={18} /> Exit
                        </button>
                    </div>
                </div>

                {/* Main Stats - 3 Col layout for focus */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="clay-card p-8 group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <Radio size={24} />
                            </div>
                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Tunnel Status</span>
                        </div>
                        <div className="flex items-end gap-3">
                            <h3 className="text-3xl font-black text-primary italic">ACTIVE</h3>
                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse mb-3" />
                        </div>
                    </div>

                    <div className="clay-card p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-accent-purple/10 rounded-xl text-accent-purple">
                                <Download size={24} />
                            </div>
                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Data Transferred</span>
                        </div>
                        <h3 className="text-3xl font-black italic">{usage.downloaded} <span className="text-[10px] font-normal text-gray-600 not-italic uppercase tracking-widest">Megabytes</span></h3>
                    </div>

                    <div className="clay-card p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-accent-pink/10 rounded-xl text-accent-pink">
                                <Zap size={24} />
                            </div>
                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Account Tier</span>
                        </div>
                        <h3 className="text-3xl font-black italic text-gradient uppercase">{profile?.plan || 'Premium'}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Node List */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                                <Globe className="text-primary" /> Global Mesh
                            </h3>
                            <div className="text-[10px] font-black text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/20 uppercase tracking-[0.2em]">
                                {servers.length} Nodes Online
                            </div>
                        </div>

                        <div className="space-y-4">
                            {servers.map((server: any) => (
                                <div key={server._id} className="clay-card p-6 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-white/[0.02] transition-all">
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="w-16 h-16 rounded-2xl bg-background border border-white/5 flex items-center justify-center relative overflow-hidden">
                                            <MapPin size={28} className="text-gray-600 group-hover:text-primary transition-colors z-10" />
                                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-black text-xl italic uppercase tracking-tighter">{server.location}</h4>
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            </div>
                                            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">{server.name} • <span className="text-primary-light">REALITY-WS</span></p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
                                        <div className="text-right">
                                            <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">LATENCY</p>
                                            <p className="text-primary-light font-black italic text-xl tracking-tighter">{server.ping}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">CAPACITY</p>
                                            <p className="text-white font-black italic text-xl tracking-tighter">{server.load}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/5">
                                            <Zap size={20} fill="currentColor" className="opacity-50" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Downloads / Actions */}
                    <div className="space-y-8">
                        <div className="clay-card p-8 !bg-primary/5 border-primary/20 relative overflow-visible">
                            <div className="absolute -top-3 left-8 bg-primary text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Key Management</div>

                            <div className="space-y-6">
                                <div className="p-4 bg-background/50 rounded-2xl border border-white/5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Master Key</span>
                                        {profile?.isSubscribed && (
                                            <button
                                                onClick={copyToClipboard}
                                                className="text-primary hover:scale-110 transition-transform"
                                            >
                                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                            </button>
                                        )}
                                    </div>
                                    <div className="bg-black/40 p-3 rounded-xl border border-white/5 overflow-hidden relative min-h-[60px] flex items-center justify-center">
                                        {profile?.isSubscribed ? (
                                            <p className="text-[8px] font-mono text-primary-light leading-[1.2] break-all line-clamp-3 uppercase tracking-tighter">
                                                {profile?.uuid ? `vless://${profile.uuid}@${servers[0]?.host || 'in1.orbixa.0xutkarsh.tech'}:443?type=ws&security=tls&path=/orbixa#Orbixa` : 'Handshaking...'}
                                            </p>
                                        ) : (
                                            <div className="text-center space-y-3 py-4 w-full">
                                                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Select Your Tier</p>
                                                <div className="flex flex-col gap-2 px-2">
                                                    <button
                                                        onClick={() => handleSubscribe('lite')}
                                                        className="btn-primary !py-3 !px-4 !text-[10px] !rounded-xl w-full"
                                                    >
                                                        MONTHLY (₹70)
                                                    </button>
                                                    <button
                                                        onClick={() => handleSubscribe('pro')}
                                                        className="bg-accent-purple hover:bg-accent-purple-light text-black font-black py-3 px-4 text-[10px] rounded-xl w-full shadow-glow-purple transition-all"
                                                    >
                                                        QUARTERLY (₹180)
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h4 className="text-sm font-black italic uppercase tracking-widest">Recommended App</h4>
                                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Download **v2rayN-windows-64** to activate your tunnel instantly.</p>
                                    <Link
                                        href="https://github.com/2dust/v2rayN/releases/download/7.17.3/v2rayN-windows-64-desktop.zip"
                                        className="btn-primary w-full !rounded-2xl !py-4 shadow-accent-glow"
                                    >
                                        <Download size={18} /> DOWNLOAD ZIP
                                    </Link>
                                    <p className="text-[9px] text-gray-600 italic text-center">*Native client in development</p>
                                </div>
                            </div>
                        </div>

                        {/* Force Sync */}
                        <button
                            onClick={async () => {
                                const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn-working.onrender.com/api';
                                const token = localStorage.getItem('orbixa_token');
                                try {
                                    const res = await fetch(`${api_url}/vpn/sync`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
                                    if (res.ok) alert('Orbixa Nodes Synced Successfully.');
                                    else alert('Sync failed. Please try again.');
                                } catch (e) { alert('Network Error.'); }
                            }}
                            className="w-full clay-card p-6 flex items-center justify-center gap-4 group hover:border-primary/50 transition-all text-sm font-black uppercase tracking-widest text-gray-400"
                        >
                            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-700" /> Force Node Sync
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
