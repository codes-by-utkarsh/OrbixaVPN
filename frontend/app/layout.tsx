import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Orbixa VPN | Secure, Private, Borderless',
    description: 'The next generation of privacy. Experience lightning fast connections with our VLESS-powered global network.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.className} antialiased`}>
                <Navbar />
                {children}
                <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            </body>
        </html>
    );
}
