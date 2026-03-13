import { ArrowRight, Shield, Globe, Zap, Cpu, Check } from 'lucide-react';
import Link from 'next/link';
import ConsolePreview from '@/components/ConsolePreview';

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0 scale-110">
                    <img
                        src="/hero-bg.png"
                        alt=""
                        className="w-full h-full object-cover opacity-30 grayscale brightness-75 mix-blend-lighten"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                    <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
                </div>

                <div className="cyber-glow top-20 left-[-10%] w-[600px] h-[600px] bg-primary/20" />
                <div className="cyber-glow bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-purple/20" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-[10px] font-bold uppercase tracking-[0.2em] mb-8 animate-float">
                            <Zap size={12} className="text-primary fill-primary" />
                            Next-Gen VLESS Infrastructure Live
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.85] italic">
                            SECURE.<br />
                            PRIVATE.<br />
                            <span className="text-gradient">BORDERLESS.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                            Experience the future of digital freedom. Deep packet inspection invisible, zero-latency tunneling through our high-performance Global Mesh.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="/register" className="btn-primary text-lg group">
                                Start Browsing <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/login" className="btn-secondary text-lg">
                                Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="mt-24 max-w-6xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
                        <div className="clay-card p-4 !rounded-[3rem] group">
                            <ConsolePreview />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                        <div>
                            <span className="text-primary-dark font-black uppercase tracking-[0.5em] text-[10px]">Architecture</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-4 italic leading-none uppercase">Advanced <br />Tunneling.</h2>
                        </div>
                        <p className="text-gray-500 max-w-sm text-sm font-medium">We've re-engineered the VPN backbone using VLESS Reality protocols for maximum stealth.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="clay-card p-10 space-y-8 group hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Cpu size={32} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold italic uppercase tracking-tighter">VLESS reality</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">Leverage undetectable Reality transport protocols that mask your traffic as standard secure web data.</p>
                            </div>
                        </div>

                        <div className="clay-card p-10 space-y-8 group hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 bg-accent-purple/10 rounded-2xl flex items-center justify-center text-accent-purple group-hover:scale-110 transition-transform">
                                <Shield size={32} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold italic uppercase tracking-tighter">Volatility</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">Our RAM-only nodes reset constantly, ensuring no logs ever exist. Total volatile privacy by design.</p>
                            </div>
                        </div>

                        <div className="clay-card p-10 space-y-8 group hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 bg-accent-pink/10 rounded-2xl flex items-center justify-center text-accent-pink group-hover:scale-110 transition-transform">
                                <Globe size={32} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold italic uppercase tracking-tighter">Global Mesh</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">Premium peering lines across 30+ countries with 10Gbps backbone for zero-latency streaming and gaming.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-32 bg-surface/10 border-y border-white/5 relative overflow-hidden">
                <div className="cyber-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-5xl font-black italic tracking-tighter mb-6 uppercase">Elite Access.</h2>
                        <p className="text-gray-500 font-medium italic">Choose the plan that fits your privacy needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                        <div className="clay-card p-10 flex flex-col items-center text-center !rounded-5xl">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Standard</span>
                            <div className="text-5xl font-black italic mb-8">$0<span className="text-sm font-normal text-gray-600 not-italic">/mo</span></div>
                            <ul className="space-y-4 mb-10 text-sm text-gray-500 font-medium w-full">
                                <li className="flex items-center justify-center gap-2 font-bold"><Check size={14} className="text-primary font-black" strokeWidth={3} /> 2 Global Regions</li>
                                <li className="flex items-center justify-center gap-2 font-bold"><Check size={14} className="text-primary font-black" strokeWidth={3} /> Standard Speeds</li>
                                <li className="flex items-center justify-center gap-2 font-bold"><Check size={14} className="text-primary font-black" strokeWidth={3} /> 1 Device Limit</li>
                            </ul>
                            <Link href="/register" className="btn-secondary w-full !rounded-2xl">Start Free</Link>
                        </div>

                        <div className="clay-card p-12 flex flex-col items-center text-center !rounded-5xl border-primary/20 scale-105 shadow-glow relative overflow-visible">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-glow">Most Popular</div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Premium</span>
                            <div className="text-7xl font-black italic mb-8 text-gradient">$5.99<span className="text-sm font-normal text-gray-600 not-italic">/mo</span></div>
                            <ul className="space-y-5 mb-12 text-sm text-white font-black w-full uppercase tracking-tighter">
                                <li className="flex items-center justify-center gap-3"><Check size={18} className="text-primary" strokeWidth={3} /> 50+ Global Nodes</li>
                                <li className="flex items-center justify-center gap-3"><Check size={18} className="text-primary" strokeWidth={3} /> Ultra-Low Latency</li>
                                <li className="flex items-center justify-center gap-3"><Check size={18} className="text-primary" strokeWidth={3} /> 5 Devices Limit</li>
                                <li className="flex items-center justify-center gap-3"><Check size={18} className="text-primary" strokeWidth={3} /> Priority Support</li>
                            </ul>
                            <Link href="/register" className="btn-primary w-full !rounded-2xl shadow-accent-glow">Go Pro Access</Link>
                        </div>

                        <div className="clay-card p-10 flex flex-col items-center text-center !rounded-5xl">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Business</span>
                            <div className="text-5xl font-black italic mb-8">$19.99<span className="text-sm font-normal text-gray-600 not-italic">/mo</span></div>
                            <ul className="space-y-4 mb-10 text-sm text-gray-500 font-medium w-full">
                                <li className="flex items-center justify-center gap-2 font-bold"><Check size={14} className="text-primary font-black" strokeWidth={3} /> Private Dedicated Nodes</li>
                                <li className="flex items-center justify-center gap-2 font-bold"><Check size={14} className="text-primary font-black" strokeWidth={3} /> Full API Access</li>
                                <li className="flex items-center justify-center gap-2 font-bold"><Check size={14} className="text-primary font-black" strokeWidth={3} /> Team Management</li>
                            </ul>
                            <Link href="/register" className="btn-secondary w-full !rounded-2xl">Contact Sales</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 relative overflow-hidden bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-t border-white/5 pt-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-cyber-gradient rounded-xl shadow-glow" />
                                <span className="text-3xl font-black italic tracking-tighter">ORBIXA</span>
                            </div>
                            <p className="text-gray-500 text-sm max-w-xs font-medium">
                                Redefining digital limits. High-performance tunneling for the modern era.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                            <div className="space-y-4 flex flex-col">
                                <span className="text-white">Product</span>
                                <Link href="#" className="hover:text-primary transition-colors">Nodes</Link>
                                <Link href="#" className="hover:text-primary transition-colors">Tech</Link>
                            </div>
                            <div className="space-y-4 flex flex-col">
                                <span className="text-white">Company</span>
                                <Link href="#" className="hover:text-primary transition-colors">About</Link>
                                <Link href="#" className="hover:text-primary transition-colors">Support</Link>
                            </div>
                            <div className="space-y-4 flex flex-col">
                                <span className="text-white">Legal</span>
                                <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                                <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col md:flex-row justify-between text-[10px] font-black uppercase tracking-widest text-gray-600 border-t border-white/5 pt-8">
                        <p>© 2026 Orbixa VPN. Engineered for supreme privacy.</p>
                        <p className="flex items-center gap-2">Built with <span className="text-primary">Cyber-Clay</span> Stack</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
