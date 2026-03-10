'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'https://orbixavpn.onrender.com/api';
            const response = await fetch(`${api_url}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => window.location.href = '/login', 2000);
            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch (err) {
            setError('Connection to Orbixa backend failed.');
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 bg-card border border-gray-800 p-10 rounded-2xl shadow-glow">
                <div className="text-center">
                    <Shield className="mx-auto h-12 w-12 text-primary drop-shadow-glow" />
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                        Get Protected
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Join Orbixa VPN Today
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded-lg text-sm text-center">
                        Account created! Redirecting to login...
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-lg border-0 bg-background py-3 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full rounded-lg border-0 bg-background py-3 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg bg-primary py-3 px-4 text-sm font-semibold text-black hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shadow-glow transition-all"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-gray-400">
                    Already a member?{' '}
                    <Link href="/login" className="font-semibold text-primary hover:text-cyan-400">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
