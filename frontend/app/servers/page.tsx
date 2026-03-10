'use client';

import { useEffect, useState } from 'react';
import { Wifi, Server as ServerIcon } from 'lucide-react';

export default function Servers() {
    const [servers, setServers] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('orbixa_token');
        if (!token) {
            window.location.href = '/login';
            return;
        }

        const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
        fetch(`${api_url}/vpn/servers`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setServers(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <ServerIcon className="text-primary" /> Global Network
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servers.map((s) => (
                    <div key={s.id} className="bg-card border border-gray-800 rounded-xl p-6 hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">{s.location}</h3>
                            <span className={`w-3 h-3 rounded-full ${s.status === 'online' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Server Load</span>
                                <span className="text-gray-200">{s.currentLoad}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Orbixa Domain</span>
                                <span>{s.domain}</span>
                            </div>
                        </div>

                        <button
                            className="w-full py-2 rounded-lg font-bold flex items-center justify-center gap-2 bg-primary/10 text-primary border border-primary/50 hover:bg-primary hover:text-black hover:shadow-glow transition-all"
                        >
                            <Wifi size={16} /> Connect
                        </button>
                    </div>
                ))}

                {servers.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-400 italic">
                        No servers found. Please add a server in the Admin Panel.
                    </div>
                )}
            </div>
        </div>
    )
}
