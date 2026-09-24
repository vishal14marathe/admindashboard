import Link from 'next/link';

export default function ProductNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">404 — Product not found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
            <Link href="/products" className="bg-blue-600 text-white px-4 py-2 rounded">
                Back to products
            </Link>
        </div>
    );
}