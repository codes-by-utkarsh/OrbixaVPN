'use client';

import { Terminal, Shield, Globe, Zap, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ConsolePreview() {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        const messages = [
            "Initializing Orbixa Mesh V3...",
            "Connecting to node: us-east-master [10.2.0.45]",
            "Protocol: VLESS-REALITY established.",
            "Handshake verified. Encryption: X25519",
            "Tunnel status: ACTIVE",
            "Routing traffic through global obfuscation layer...",
            "Ready for secure browsing."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < messages.length) {
                setLines(prev => [...prev, messages[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
            {/* Left: Terminal Console */}
            <div className="lg:col-span-8 bg-[#0a0c10] border border-white/5 rounded-3xl overflow-hidden shadow-2xl h-[400px] flex flex-col">
                <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Core Engine Console</span>
                    <Terminal size={14} className="text-gray-600" />
                </div>
                <div className="p-8 font-mono text-sm space-y-3 overflow-y-auto flex-1">
                    {lines.map((line, idx) => (
                        <div key={idx} className="flex gap-4">
                            <span className="text-primary/40 shrink-0 select-none">[{idx + 1}]</span>
                            <span className={idx === lines.length - 1 ? "text-primary animate-pulse" : "text-gray-400"}>
                                <span className="text-primary-dark mr-2">$</span>
                                {line}
                            </span>
                        </div>
                    ))}
                    {lines.length < 7 && <div className="w-2 h-5 bg-primary animate-pulse ml-8" />}
                </div>
            </div>

            {/* Right: Quick Stats Cards */}
            <div className="lg:col-span-4 grid grid-rows-3 gap-4">
                <div className="clay-card !bg-white/[0.02] p-6 flex items-center justify-between group">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Latency</span>
                        <div className="text-2xl font-black italic text-primary group-hover:scale-110 transition-transform origin-left">14ms</div>
                    </div>
                    <Activity className="text-primary/20 group-hover:text-primary transition-colors" size={32} />
                </div>

                <div className="clay-card !bg-white/[0.02] p-6 flex items-center justify-between group">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Active Nodes</span>
                        <div className="text-2xl font-black italic text-accent-purple group-hover:scale-110 transition-transform origin-left">1,245</div>
                    </div>
                    <Globe className="text-accent-purple/20 group-hover:text-accent-purple transition-colors" size={32} />
                </div>

                <div className="clay-card !bg-white/[0.02] p-6 flex items-center justify-between group">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Bandwidth</span>
                        <div className="text-2xl font-black italic text-accent-pink group-hover:scale-110 transition-transform origin-left">2.4 Gbps</div>
                    </div>
                    <Zap className="text-accent-pink/20 group-hover:text-accent-pink transition-colors" size={32} />
                </div>
            </div>
        </div>
    );
}
