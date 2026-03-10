import { ArrowRight, Shield, Globe, Zap } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-32 text-center flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    Secure Your Internet with <br />
                    <span className="text-primary drop-shadow-glow">Orbixa VPN</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mb-12">
                    Experience borderless browsing with cutting-edge VLESS protocol. Privacy-focused, lightning-fast, and deeply secure.
                </p>
                <div className="flex gap-4">
                    <button className="bg-primary text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-300 transition-all shadow-glow flex items-center gap-2">
                        Get Started <ArrowRight size={20} />
                    </button>
                    <button className="border border-gray-600 bg-card/50 text-white px-8 py-4 rounded-lg font-bold text-lg hover:border-gray-400 transition-all">
                        Download Client
                    </button>
                </div>
            </section>

            {/* Features */}
            <section className="bg-card py-20" id="features">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-background border border-gray-800 hover:border-primary/50 transition-all">
                        <Shield className="text-primary mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-2">VLESS + XTLS</h3>
                        <p className="text-gray-400">Military-grade encryption leveraging Xray-core for undetectable internet tunneling.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-background border border-gray-800 hover:border-primary/50 transition-all">
                        <Globe className="text-primary mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-2">Global Network</h3>
                        <p className="text-gray-400">Over 50+ strategically placed high-bandwidth servers masking your real identity.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-background border border-gray-800 hover:border-primary/50 transition-all">
                        <Zap className="text-primary mb-4" size={40} />
                        <h3 className="text-2xl font-bold mb-2">Instant Connect</h3>
                        <p className="text-gray-400">Minimal latency with our custom Rust-powered desktop and mobile clients.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
