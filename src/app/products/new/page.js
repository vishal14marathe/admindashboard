'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import Navbar from '@/components/Navbar';
import ProductForm from '@/components/ProductForm';
import { addProduct } from '@/store/productOverlay';

export default function NewProductPage() {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data) => {
    if (saving) return;
    setSaving(true);
    // Simulate an API call
    await new Promise((r) => setTimeout(r, 300));
    addProduct({ ...data, thumbnail: '/placeholder.png', images: [] });
    setSaving(false);
    router.push('/products');
  };

  return (
    <AuthGuard>
      <Navbar />
      <main className="p-4 md:p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>
        <ProductForm onSubmit={handleSubmit} submitting={saving} submitLabel="Create" />
      </main>
    </AuthGuard>
  );
}