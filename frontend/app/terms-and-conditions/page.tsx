import Link from 'next/link';

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background px-6">
            <div className="max-w-4xl mx-auto clay-card p-12">
                <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter text-primary">Terms & Conditions</h1>
                <div className="prose prose-invert max-w-none text-gray-400 space-y-6 font-medium">
                    <p>By using Orbixa VPN, you agree to the following terms:</p>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">1. Use of Service</h2>
                        <p>You agree not to use the service for any illegal activities, including but not limited to hacking, distribution of illegal content, or violating intellectual property rights.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">2. Subscription</h2>
                        <p>Access to VPN nodes is gated behind a paid subscription. Subscriptions are billed on a monthly basis.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">3. Termination</h2>
                        <p>We reserve the right to terminate accounts that violate our terms of service without prior notice.</p>
                    </section>
                </div>
                <div className="mt-12">
                    <Link href="/" className="text-primary hover:underline font-bold uppercase tracking-widest text-[10px]">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
