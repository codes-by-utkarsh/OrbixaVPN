'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Shield, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn-working.onrender.com/api';

        try {
            const res = await fetch(`${api_url}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('orbixa_token', data.token);
                router.push('/dashboard');
            } else {
                const data = await res.json().catch(() => ({ message: 'Unexpected server response' }));
                alert(`Login Failed: ${data.message || 'Check your credentials'}`);
            }
        } catch (err: any) {
            console.error('Login error:', err);
            alert(`Network error: ${err.message || 'Cannot connect to server. Check if backend is awake.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            <div className="cyber-glow top-0 left-0 w-[600px] h-[600px] bg-primary/10" />
            <div className="cyber-glow bottom-0 right-0 w-[500px] h-[500px] bg-accent-purple/10" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-3 font-black text-2xl italic tracking-tighter mb-8">
                            <div className="w-10 h-10 bg-cyber-gradient rounded-xl shadow-glow" />
                            <span>ORBIXA</span>
                        </Link>
                        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase">Identity.</h1>
                        <p className="text-gray-500 font-bold italic">Secure access to your private tunnel.</p>
                    </div>

                    <div className="clay-card p-12 !rounded-[3rem] shadow-2xl">
                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Email Hash</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="user@orbixa.mesh"
                                        className="w-full bg-background border border-white/5 rounded-2xl py-5 pl-14 pr-6 focus:border-primary/50 outline-none transition-all font-bold text-white placeholder:text-gray-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center ml-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Secret Token</label>
                                    <Link href="#" className="text-[10px] text-primary-dark font-black hover:text-primary transition-colors uppercase tracking-widest">Recovery?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-background border border-white/5 rounded-2xl py-5 pl-14 pr-6 focus:border-primary/50 outline-none transition-all font-bold text-white placeholder:text-gray-700"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full !py-5 !text-xl !rounded-2xl group shadow-accent-glow"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : (
                                    <span className="flex items-center justify-center gap-3">AUTHORIZE <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} /></span>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center pt-8 border-t border-white/5">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest italic">
                                New agent? <Link href="/register" className="text-primary font-black hover:text-primary-light transition-colors">Register Unit</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
