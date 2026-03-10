'use client';

import { useEffect, useState } from 'react';
import { LayoutGrid, Plus, Trash2, Users } from 'lucide-react';

export default function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([]);
    const [servers, setServers] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newServer, setNewServer] = useState({ name: '', location: '', domain: '', ipAddress: '', port: 443, maxUsers: 100 });

    const fetchAdminData = async () => {
        const token = localStorage.getItem('orbixa_token');
        if (!token) return;

        const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn.onrender.com/api';

        try {
            const usersRes = await fetch(`${api_url}/admin/users`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (usersRes.ok) setUsers(await usersRes.json());

            const serversRes = await fetch(`${api_url}/admin/servers`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (serversRes.ok) {
                const data = await serversRes.json();
                console.log("Servers found:", data);
                setServers(data);
            }
        } catch (e) {
            console.error("Failed to fetch admin data", e);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    const handleAddServer = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('orbixa_token');
        const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn.onrender.com/api';

        try {
            const res = await fetch(`${api_url}/admin/server/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newServer)
            });
            if (res.ok) {
                setIsAdding(false);
                fetchAdminData();
            } else {
                const err = await res.json();
                alert("Error adding server: " + (err.message || res.statusText));
            }
        } catch (e: any) {
            alert("Network Error: " + e.message);
            console.error(e);
        }
    };

    const handleRemoveServer = async (id: string) => {
        const token = localStorage.getItem('orbixa_token');
        const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn.onrender.com/api';

        try {
            await fetch(`${api_url}/admin/server/remove`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ id })
            });
            fetchAdminData();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <LayoutGrid className="text-primary" /> Admin Panel
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card border border-gray-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Users className="text-primary" /> Registered Users
                        </h2>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {users.map(u => (
                            <div key={u.id} className="flex justify-between items-center p-3 bg-background rounded-lg border border-gray-800">
                                <div className="overflow-hidden">
                                    <p className="font-semibold text-white truncate">{u.email}</p>
                                    <p className="text-xs text-gray-500">{u.plan || 'Free Plan'} | ID: {u.id ? u.id.substring(0, 8) : 'Unknown'}</p>
                                </div>
                                <span className={`shrink-0 px-2 py-1 text-[10px] uppercase font-bold rounded ${u.active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                    {u.active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        ))}
                        {users.length === 0 && <p className="text-gray-500 text-sm">No users found.</p>}
                    </div>
                </div>

                <div className="bg-card border border-gray-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Server Infrastructure
                        </h2>
                        <button onClick={() => setIsAdding(!isAdding)} className="bg-primary/10 text-primary border border-primary/50 px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-primary hover:text-black transition-all">
                            <Plus size={16} /> Add Node
                        </button>
                    </div>

                    {isAdding && (
                        <form onSubmit={handleAddServer} className="mb-6 p-4 border border-primary/30 rounded-lg bg-background">
                            <h3 className="text-sm font-bold text-primary mb-3">Deploy New VPN Node</h3>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <input required placeholder="Name (e.g. EU-Central)" className="w-full bg-black border border-gray-700 p-2 text-sm rounded text-white" value={newServer.name} onChange={e => setNewServer({ ...newServer, name: e.target.value })} />
                                <input required placeholder="Location (e.g. Germany)" className="w-full bg-black border border-gray-700 p-2 text-sm rounded text-white" value={newServer.location} onChange={e => setNewServer({ ...newServer, location: e.target.value })} />
                                <input required placeholder="Domain (e.g. de1.vpn.net)" className="w-full bg-black border border-gray-700 p-2 text-sm rounded text-white" value={newServer.domain} onChange={e => setNewServer({ ...newServer, domain: e.target.value })} />
                                <input required placeholder="IP Address" className="w-full bg-black border border-gray-700 p-2 text-sm rounded text-white" value={newServer.ipAddress} onChange={e => setNewServer({ ...newServer, ipAddress: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full bg-primary text-black font-bold py-2 rounded shadow-glow">Deploy Server</button>
                        </form>
                    )}

                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {servers.map(s => (
                            <div key={s.id} className="flex justify-between items-center p-3 bg-background rounded-lg border border-gray-800">
                                <div>
                                    <p className="font-semibold text-white flex items-center gap-2">
                                        {s.name}
                                        <span className={`w-2 h-2 rounded-full ${s.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    </p>
                                    <p className="text-xs text-gray-500">{s.domain} • {s.location}</p>
                                </div>
                                <button onClick={() => handleRemoveServer(s.id)} className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {servers.length === 0 && !isAdding && <p className="text-gray-500 text-sm">No servers deployed yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
