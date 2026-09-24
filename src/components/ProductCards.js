'use client';
import Link from 'next/link';

export default function ProductCards({ products, onDelete }) {
    return (
        <div className="md:hidden grid grid-cols-1 gap-4">
            {products.map((p) => (
                <div key={p.id} className="border rounded-lg p-4">
                    <img src={p.thumbnail} alt={p.title} className="w-full h-40 object-cover rounded mb-3" />
                    <h3 className="font-semibold">
                        <Link href={`/products/${p.id}`} className="text-blue-600">{p.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">{p.category}</p>
                    <p className="mt-1">${p.price} · ⭐ {p.rating} · Stock: {p.stock}</p>
                    <div className="flex gap-3 mt-3">
                        <Link href={`/products/${p.id}/edit`} className="text-blue-600 text-sm">Edit</Link>
                        <button onClick={() => onDelete(p)} className="text-red-600 text-sm">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}