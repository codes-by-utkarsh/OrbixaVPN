import { ArrowRight, Shield, Globe, Zap, Lock, Cpu, Server, Check } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat scale-105"
                    style={{ filter: 'brightness(0.4)' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Next-Gen VLESS Infrastructure is Live
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-none italic animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                        SECURE. PRIVATE. <br />
                        <span className="text-gradient">BORDERLESS.</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                        Experience true digital freedom with Orbixa VPN. Leveraging cutting-edge Xray-core technology for undetectable internet tunneling.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                        <Link href="/register" className="btn-primary w-full sm:w-auto px-10 py-4 text-lg">
                            Get Started Now <ArrowRight size={20} />
                        </Link>
                        <Link href="/login" className="btn-secondary w-full sm:w-auto px-10 py-4 text-lg">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <div className="w-1 h-12 rounded-full bg-gradient-to-b from-primary to-transparent"></div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-background border-t border-border">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs">Core Technology</span>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mt-4 italic">ADVANCED TUNNELING <br />RE-IMAGINED.</h2>
                    </div>

                    <div className="space-y-40">
                        {/* Feature 1: VLESS Engine */}
                        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-widest">
                                    Protocol Alpha
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">The Visionary <br /><span className="text-gradient">VLESS + Reality.</span></h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    We've moved beyond traditional VPN protocols like OpenVPN and WireGuard. Our proprietary VLESS implementation utilizes the <strong>Reality</strong> transport protocol, making your data streams indistinguishable from standard, secure web traffic.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "DPI-Immune: Pass through the strictest firewalls.",
                                        "Minimal Header Overhead: Faster handshake, lower latency.",
                                        "Zero Fingerprint: No recognizable VPN 'signature'."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 w-full aspect-square relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full opacity-50"></div>
                                <div className="premium-border bg-surface/30 p-8 rounded-[3rem] w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                    <Cpu size={120} className="text-primary mb-8 group-hover:scale-110 transition-transform duration-500 opacity-50" />
                                    <div className="space-y-2 font-mono text-[10px] text-primary/50">
                                        <p>Handshaking: OK</p>
                                        <p>Encryption: Reality/TLS</p>
                                        <p>Tunnel: Transparent</p>
                                    </div>
                                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2: RAM-Only Infrastructure */}
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32">
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono font-bold uppercase tracking-widest">
                                    Privacy Core
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Total Volatility <br /><span className="text-gradient from-red-500 to-orange-500">Zero-Log Identity.</span></h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Your digital footprint ends where our servers begin. We operate a massive network of <strong>RAM-only nodes</strong> that reboot every 24 hours, ensuring that no user data ever survives a cycle.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-surface/20 border border-border rounded-2xl">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">State</p>
                                        <p className="text-red-500 font-mono text-sm uppercase">Transient</p>
                                    </div>
                                    <div className="p-4 bg-surface/20 border border-border rounded-2xl">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Method</p>
                                        <p className="text-white font-mono text-sm uppercase">Encrypted RAM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full aspect-square relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-red-500/10 blur-[120px] rounded-full opacity-50"></div>
                                <div className="premium-border bg-surface/30 p-12 rounded-[3rem] w-full h-full flex flex-col items-center justify-center relative overflow-hidden group">
                                    <Shield size={120} className="text-red-400 mb-8 animate-pulse-slow opacity-50" />
                                    <div className="w-full space-y-4">
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 w-[70%]" />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-gray-500">
                                            <span>RAM USAGE</span>
                                            <span>VOLATILE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3: Global Mesh */}
                        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-bold uppercase tracking-widest">
                                    Network Grid
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">The Global Mesh <br /><span className="text-gradient">No-Latency Backbone.</span></h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Orbixa doesn't rent standard server space. We own our hardware on premium peering lines across 30+ countries. This guarantees high bandwidth and 99.9% uptime for gamers and streamers alike.
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">100+</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Nodes</p>
                                    </div>
                                    <div className="w-[1px] h-10 bg-border" />
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-white">10Gbps</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Line Speed</p>
                                    </div>
                                    <div className="w-[1px] h-10 bg-border" />
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-accent">99.9%</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">SLA Uptime</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full aspect-square relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-accent/10 blur-[120px] rounded-full opacity-50"></div>
                                <div className="premium-border bg-surface/30 p-12 rounded-[3rem] w-full h-full flex flex-col items-center justify-center relative overflow-hidden group">
                                    <Globe size={120} className="text-accent mb-8 group-hover:rotate-12 transition-transform duration-500 opacity-50" />
                                    <div className="grid grid-cols-4 gap-2 w-full">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className={`h-8 rounded-lg bg-accent/${(i + 1) * 10} border border-accent/20`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 bg-surface/20 border-y border-border">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            Built by privacy enthusiasts, <br />
                            <span className="text-primary italic">for everyone.</span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-xl">
                            At Orbixa, we believe privacy isn't a premium feature—it's a human right. Our engineers have built a system that bypasses even the most advanced censorship.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "Native support for Windows, macOS, and Linux",
                                "Unlimited bandwidth on all plans",
                                "Dedicated IP options for elite privacy",
                                "Multi-hop connection chaining"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="bg-primary/20 p-1 rounded-full">
                                        <Check className="text-primary" size={16} />
                                    </div>
                                    <span className="text-gray-300 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="btn-secondary">Learn More About Our Tech</button>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30"></div>
                        <div className="relative p-2 bg-surface border border-border rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <img
                                src="/hero-bg.png"
                                alt="Dashboard Preview"
                                className="rounded-[2rem] border border-border h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
                        <p className="text-gray-400 max-w-lg mx-auto">Choose the plan that fits your privacy needs. No hidden fees, ever.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Free Plan */}
                        <div className="premium-border p-8 bg-surface/30 rounded-3xl flex flex-col items-center">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Standard</span>
                            <div className="text-4xl font-bold mb-8">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            <ul className="space-y-4 mb-10 w-full">
                                <li className="text-gray-400 flex items-center gap-2"><Check size={16} className="text-primary" /> 2 Global Regions</li>
                                <li className="text-gray-400 flex items-center gap-2"><Check size={16} className="text-primary" /> Standard Speeds</li>
                                <li className="text-gray-400 flex items-center gap-2"><Check size={16} className="text-primary" /> Community Support</li>
                            </ul>
                            <Link href="/register" className="btn-secondary w-full mt-auto">Get Started</Link>
                        </div>

                        {/* Pro Plan */}
                        <div className="border-2 border-primary p-12 bg-surface/50 rounded-3xl flex flex-col items-center relative scale-105 shadow-glow">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
                            <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Premium</span>
                            <div className="text-5xl font-bold mb-8">$5.99<span className="text-xl text-gray-500 font-normal">/mo</span></div>
                            <ul className="space-y-6 mb-12 w-full text-lg">
                                <li className="text-white flex items-center gap-3"><Check size={20} className="text-primary" /> All 50+ Global Regions</li>
                                <li className="text-white flex items-center gap-3"><Check size={20} className="text-primary" /> Ultra-Low Latency (1ms)</li>
                                <li className="text-white flex items-center gap-3"><Check size={20} className="text-primary" /> 24/7 Priority Support</li>
                                <li className="text-white flex items-center gap-3"><Check size={20} className="text-primary" /> Dedicated Static IPs</li>
                            </ul>
                            <Link href="/register" className="btn-primary w-full mt-auto py-5 text-xl">Get Pro Access</Link>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="premium-border p-8 bg-surface/30 rounded-3xl flex flex-col items-center">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Business</span>
                            <div className="text-4xl font-bold mb-8">$19.99<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            <ul className="space-y-4 mb-10 w-full">
                                <li className="text-gray-400 flex items-center gap-2"><Check size={16} className="text-primary" /> 10 Concurrent Devices</li>
                                <li className="text-gray-400 flex items-center gap-2"><Check size={16} className="text-primary" /> Private VPS Nodes</li>
                                <li className="text-gray-400 flex items-center gap-2"><Check size={16} className="text-primary" /> Advanced API Access</li>
                            </ul>
                            <Link href="/register" className="btn-secondary w-full mt-auto">Get Business</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-border bg-surface/10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Orbixa Logo" className="w-8 h-8 object-cover rounded-lg border border-primary/20" />
                                <span className="text-2xl font-bold tracking-tight">Orbixa<span className="text-primary text-gradient">VPN</span></span>
                            </div>
                            <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                                High-performance, privacy-first internet tunneling for the modern era.
                            </p>
                        </div>
                        <div className="flex gap-10 text-sm font-medium text-gray-400">
                            <Link href="/privacy" className="hover:text-white pb-1 border-b border-transparent hover:border-primary">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white pb-1 border-b border-transparent hover:border-primary">Terms of Service</Link>
                            <Link href="/contact" className="hover:text-white pb-1 border-b border-transparent hover:border-primary">Contact Us</Link>
                        </div>
                        <p className="text-gray-600 text-xs">© 2026 Orbixa VPN. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
