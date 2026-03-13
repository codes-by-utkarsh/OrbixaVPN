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
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                        <img
                            src="/logo.png"
                            alt="Orbixa Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">Orbixa<span className="text-primary text-gradient">VPN</span></span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
                    <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
                    <Link href="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
                    <div className="h-6 w-[1px] bg-border mx-2"></div>
                    <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
                    <Link href="/register" className="btn-primary py-2 px-5 text-sm">Get Started</Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <Link href="/#features" onClick={() => setIsOpen(false)} className="text-lg font-medium">Features</Link>
                    <Link href="/#about" onClick={() => setIsOpen(false)} className="text-lg font-medium">About</Link>
                    <Link href="/#pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium">Pricing</Link>
                    <hr className="border-border" />
                    <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium">Login</Link>
                    <Link href="/register" onClick={() => setIsOpen(false)} className="btn-primary">Get Started</Link>
                </div>
            )}
        </nav>
    );
}
