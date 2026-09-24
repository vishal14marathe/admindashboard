'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loader from './Loader';

export default function AuthGuard({ children }) {
    const { token, ready } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (ready && !token) {
            router.replace('/login');
        }
    }, [ready, token, router]);

    if (!ready) return <Loader center />;
    if (!token) return null; 

    return <>{children}</>;
}