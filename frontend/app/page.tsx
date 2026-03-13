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
            <section id="features" className="py-32 bg-background relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Orbixa?</h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="premium-border p-10 bg-surface/30 rounded-3xl group">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <Cpu className="text-primary group-hover:text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">VLESS Protocol</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Beyond traditional encryption. Our VLESS + XTLS Reality implementation makes your VPN traffic look like ordinary web browsing.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="premium-border p-10 bg-surface/30 rounded-3xl group">
                            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 border border-accent/20 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                                <Shield className="text-accent group-hover:text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Zero Log Policy</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Your data is yours. We operate on RAM-only servers, ensuring that no connection metadata or activity logs are ever stored.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="premium-border p-10 bg-surface/30 rounded-3xl group">
                            <div className="w-14 h-14 bg-primary-light/10 rounded-2xl flex items-center justify-center mb-8 border border-primary-light/20 group-hover:bg-primary-light group-hover:scale-110 transition-all duration-300">
                                <Globe className="text-primary-light group-hover:text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Global Backbone</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Access 100+ high-speed nodes across 30 countries. Optimized for streaming, gaming, and unrestricted browsing.
                            </p>
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
                            <div className="flex items-center gap-2">
                                <Shield className="text-primary" />
                                <span className="text-2xl font-bold tracking-tight">Orbixa<span className="text-primary">VPN</span></span>
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
