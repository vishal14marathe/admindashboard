'use client';
import Link from 'next/link';

export default function ProductTable({ products, onDelete }) {
    return (
        <table className="hidden md:table w-full text-left border-collapse">
            <thead>
                <tr className="border-b bg-gray-50">
                    <th className="p-3">Image</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                            <img src={p.thumbnail} alt={p.title} className="w-12 h-12 object-cover rounded" />
                        </td>
                        <td className="p-3">
                            <Link href={`/products/${p.id}`} className="text-blue-600 hover:underline">
                                {p.title}
                            </Link>
                        </td>
                        <td className="p-3 capitalize">{p.category}</td>
                        <td className="p-3">${p.price}</td>
                        <td className="p-3">⭐ {p.rating}</td>
                        <td className="p-3">{p.stock}</td>
                        <td className="p-3 flex gap-2">
                            <Link href={`/products/${p.id}/edit`} className="text-blue-600 text-sm">Edit</Link>
                            <button onClick={() => onDelete(p)} className="text-red-600 text-sm">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}