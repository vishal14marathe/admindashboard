'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginApi } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('emilys');
    const [password, setPassword] = useState('emilyspass');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError('');
        try {
            const data = await loginApi(username, password);
            console.log('LOGIN OK:', data);
            login(data.accessToken);
            router.replace('/products');
        } catch (err) {
            console.error('LOGIN FAILED:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Invalid username or password'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-5"
            >
                <div className="text-center mb-2">
                    <div className="text-3xl">🛍️</div>
                    <h1 className="text-2xl font-bold text-slate-900 mt-2">Welcome back</h1>
                    <p className="text-sm text-slate-500 mt-1">Sign in to manage products</p>
                </div>

                {error && (
                    <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                        {error}
                    </div>
                )}

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
                        placeholder="emilys"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>

                <p className="text-xs text-center text-slate-400 pt-2">
                    Demo · <code className="bg-slate-100 px-1.5 py-0.5 rounded">emilys</code> /{' '}
                    <code className="bg-slate-100 px-1.5 py-0.5 rounded">emilyspass</code>
                </p>
            </form>
        </div>
    );
}