import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background px-6">
            <div className="max-w-4xl mx-auto clay-card p-12">
                <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter text-primary">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none text-gray-400 space-y-6 font-medium">
                    <p>Last updated: March 14, 2026</p>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
                        <p>Orbixa VPN is a zero-logs provider. We do NOT collect or store logs of your activity, including no logging of browsing history, traffic destination, data content, or DNS queries. We collect only your email address for account management and payment purposes.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">2. Payment Data</h2>
                        <p>All payments are processed securely through our partners (Razorpay). We do not store your credit card or UPI details on our servers.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">3. Data Security</h2>
                        <p>We use industry-standard VLESS-REALITY encryption to secure your data in transit. Your connection is protected by state-of-the-art obfuscation layers.</p>
                    </section>
                </div>
                <div className="mt-12">
                    <Link href="/" className="text-primary hover:underline font-bold uppercase tracking-widest text-[10px]">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
