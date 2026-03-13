'use client';

import Link from 'next/link';
import { Shield, Menu, X, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl transition-all duration-300">
            <div className={`glass-card py-3 px-6 md:px-10 flex items-center justify-between !rounded-3xl border-white/5 transition-all duration-500 ${scrolled ? 'shadow-glow bg-background/40 backdrop-blur-2xl py-4' : 'shadow-2xl'}`}>
                <Link href="/" className="flex items-center gap-3 font-black text-xl italic tracking-tighter">
                    <div className="w-8 h-8 bg-cyber-gradient rounded-lg shadow-glow" />
                    <span className="hidden sm:inline">ORBIXA</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                    <Link href="/#features" className="hover:text-primary-light transition-colors">Nodes</Link>
                    <Link href="/#about" className="hover:text-primary-light transition-colors">Tech</Link>
                    <Link href="/#pricing" className="hover:text-primary-light transition-colors">Plans</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Sign In</Link>
                    <Link href="/register" className="btn-primary !px-5 !py-2.5 !text-[10px] !rounded-xl shadow-accent-glow">Join Now</Link>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-white ml-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Matching Clay/Glass Style */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full mt-4 clay-card p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <Link href="/#features" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-widest text-gray-400">Nodes</Link>
                    <Link href="/#about" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-widest text-gray-400">Tech</Link>
                    <Link href="/#pricing" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-widest text-gray-400">Plans</Link>
                    <div className="h-[1px] bg-white/5 w-full" />
                    <Link href="/login" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-widest text-primary">Sign In</Link>
                    <Link href="/register" onClick={() => setIsOpen(false)} className="btn-primary !w-full">Get Started</Link>
                </div>
            )}
        </nav>
    );
}
