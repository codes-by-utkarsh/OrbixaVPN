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
        // Simulate API call
        setTimeout(() => {
            localStorage.setItem('orbixa_token', 'mock_token');
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <main className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[100px] rounded-full animate-pulse-slow"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex p-1 bg-primary/10 rounded-2xl border border-primary/20 mb-6 overflow-hidden">
                            <img src="/logo.png" alt="Orbixa Logo" className="w-16 h-16 object-cover rounded-xl" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Securely sign in to your Orbixa account</p>
                    </div>

                    <div className="premium-border bg-surface/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-medium text-gray-300">Password</label>
                                    <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-4 text-lg group"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : (
                                    <>Sign In <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-400 text-sm">
                                Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create one for free</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
