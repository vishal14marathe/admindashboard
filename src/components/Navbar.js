'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { logout } = useAuth();
    return (
        <nav className="flex items-center justify-between bg-gray-900 text-white px-4 py-3">
            <div className="flex gap-4">
                <Link href="/products" className="font-semibold">Products</Link>
                <Link href="/products/new" className="text-sm opacity-80 hover:opacity-100">
                    + Add Product
                </Link>
            </div>
            <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
                Logout
            </button>
        </nav>
    );
}