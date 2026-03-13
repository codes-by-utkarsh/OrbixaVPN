import Link from 'next/link';
import { Mail, Shield, MessageSquare } from 'lucide-react';

export default function ContactUs() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background px-6">
            <div className="max-w-4xl mx-auto clay-card p-12">
                <h1 className="text-4xl font-black italic mb-8 uppercase tracking-tighter text-primary">Contact Us</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-1">Email Support</h3>
                                <p className="text-gray-400 font-medium">support@0xutkarsh.tech</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-accent-purple/10 rounded-2xl flex items-center justify-center text-accent-purple border border-accent-purple/20">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-1">Telegram</h3>
                                <p className="text-gray-400 font-medium">@OrbixaSupport</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                        <h3 className="text-white font-black italic uppercase tracking-tighter text-xl mb-4">Direct Inquiry</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                            For technical assistance, business partnerships, or subscription inquiries, we generally respond within 24 hours.
                        </p>
                    </div>
                </div>
                <div className="mt-12 pt-12 border-t border-white/5">
                    <Link href="/" className="text-primary hover:underline font-bold uppercase tracking-widest text-[10px]">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
