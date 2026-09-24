'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import ErrorState from '@/components/ErrorState';
import { getProductById } from '@/services/productService';
import { getMergedProduct } from '@/store/productOverlay';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      notFound();
      return;
    }
    setLoading(true);
    getProductById(id)
      .then((data) => {
        const merged = getMergedProduct(data);
        if (!merged) {
          notFound();
        } else {
          setProduct(merged);
        }
      })
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <AuthGuard><Navbar /><Loader /></AuthGuard>;
  if (error || !product) {
    return (
      <AuthGuard>
        <Navbar />
        <ErrorState message={error} onRetry={() => router.refresh()} />
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <Navbar />
      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        <Link href="/products" className="text-blue-600 text-sm">← Back to products</Link>

        <h1 className="text-2xl font-bold mt-2">{product.title}</h1>
        <p className="text-gray-500 capitalize">{product.category}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-wrap gap-3">
            {(product.images && product.images.length > 0 ? product.images : [product.thumbnail]).map(
              (img, i) => (
                <img key={i} src={img} alt={product.title} className="w-40 h-40 object-cover rounded border" />
              )
            )}
          </div>

          <div className="space-y-3">
            <p className="text-2xl font-semibold">${product.price}</p>
            <p>⭐ {product.rating} / 5</p>
            <p>Stock: {product.stock}</p>
            <p>{product.description}</p>
            <Link
              href={`/products/${product.id}/edit`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </Link>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-10 mb-3">Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-3">
            {product.reviews.map((r, i) => (
              <div key={i} className="border rounded p-3 bg-white">
                <p className="font-medium">{r.reviewerName} · ⭐ {r.rating}</p>
                <p className="text-gray-700">{r.comment}</p>
                <p className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </main>
    </AuthGuard>
  );
}