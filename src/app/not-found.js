import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">404 — Page not found</h1>
            <Link href="/products" className="bg-blue-600 text-white px-4 py-2 rounded">
                Go home
            </Link>
        </div>
    );
}