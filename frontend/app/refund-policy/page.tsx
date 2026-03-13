import Link from 'next/link';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background px-6">
            <div className="max-w-4xl mx-auto clay-card p-12">
                <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter text-primary">Refund Policy</h1>
                <div className="prose prose-invert max-w-none text-gray-400 space-y-6 font-medium">
                    <p>We want you to be satisfied with Orbixa VPN.</p>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">1. Digital Services</h2>
                        <p>Since Orbixa VPN provides digital services (bandwidth and server access), refunds are generally not provided after data has been consumed.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">2. 24-Hour Window</h2>
                        <p>If you experience technical issues that prevent you from using the service, you can request a refund within 24 hours of purchase, provided no significant data has been transferred.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">3. Contact for Refunds</h2>
                        <p>Please email our support team with your transaction ID at support@0xutkarsh.tech for refund inquiries.</p>
                    </section>
                </div>
                <div className="mt-12">
                    <Link href="/" className="text-primary hover:underline font-bold uppercase tracking-widest text-[10px]">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
