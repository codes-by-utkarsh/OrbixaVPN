'use client';

import { useEffect, useState } from 'react';
import { Activity, Radio, HardDrive, Shield, Download } from 'lucide-react';

export default function Dashboard() {
    const [profile, setProfile] = useState<any>(null);
    const [usage, setUsage] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('orbixa_token');
        if (!token) {
            window.location.href = '/login';
            return;
        }

        const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

        // Fetch User Data
        fetch(`${api_url}/auth/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.error(err));

        // Fetch Usage Data
        fetch(`${api_url}/vpn/usage`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setUsage(data))
            .catch(err => console.error(err));
    }, []);

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
