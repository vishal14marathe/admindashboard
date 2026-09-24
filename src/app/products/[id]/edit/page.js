'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import Navbar from '@/components/Navbar';
import ProductForm from '@/components/ProductForm';
import Loader from '@/components/Loader';
import { getProductById } from '@/services/productService';
import { getMergedProduct, editProduct } from '@/store/productOverlay';

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!id || isNaN(Number(id))) {
            notFound();
            return;
        }
        getProductById(id)
            .then((data) => {
                const merged = getMergedProduct(data);
                if (!merged) notFound();
                else setProduct(merged);
            })
            .catch(() => notFound())
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (data) => {
        if (saving) return;
        setSaving(true);
        await new Promise((r) => setTimeout(r, 300));
        editProduct(product.id, data);
        setSaving(false);
        router.push(`/products/${product.id}`);
    };

    if (loading) return <AuthGuard><Navbar /><Loader /></AuthGuard>;
    if (!product) return null;

    return (
        <AuthGuard>
            <Navbar />
            <main className="p-4 md:p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
                <ProductForm
                    initialValues={{
                        title: product.title,
                        price: product.price,
                        category: product.category,
                        stock: product.stock,
                        rating: product.rating,
                        description: product.description,
                    }}
                    onSubmit={handleSubmit}
                    submitting={saving}
                    submitLabel="Update"
                />
            </main>
        </AuthGuard>
    );
}