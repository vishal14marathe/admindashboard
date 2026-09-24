'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, setToken, clearToken } from '@/lib/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setTokenState] = useState(null);
    const [ready, setReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTokenState(getToken());
        setReady(true);
        const sync = () => setTokenState(getToken());
        window.addEventListener('storage', sync);
        return () => window.removeEventListener('storage', sync);
    }, []);

    const login = (t) => {
        setToken(t);
        setTokenState(t);
    };

    const logout = () => {
        clearToken();
        setTokenState(null);
        router.replace('/login');
    };

    return (
        <AuthContext.Provider value={{ token, ready, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be inside AuthProvider');
    return ctx;
}