import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Orbixa VPN - Secure. Private. Borderless.',
    description: 'A privacy-focused VPN service that allows users to securely route their internet traffic through distributed VPN servers using VLESS protocol over Xray-core.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-background text-foreground`}>
                <nav className="border-b border-gray-800 p-4 sticky top-0 bg-background/80 backdrop-blur-md z-50">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-primary tracking-wider drop-shadow-glow">Orbixa</h1>
                        <div className="space-x-6">
                            <a href="#features" className="hover:text-primary transition-colors">Features</a>
                            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                            <a href="/login" className="bg-primary/10 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-black transition-all shadow-glow">Dashboard</a>
                        </div>
                    </div>
                </nav>
                {children}
            </body>
        </html>
    )
}
