'use client';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';
import ProductTable from '@/components/ProductTable';
import ProductCards from '@/components/ProductCards';
import Loader from '@/components/Loader';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import ConfirmDialog from '@/components/ConfirmDialog';
import useUrlState from '@/hooks/useUrlState';
import { getProducts, getCategories, sortProducts } from '@/services/productService';
import {
  applyOverlay,
  deleteProduct,
} from '@/store/productOverlay';

function ProductsPageContent() {
  const { searchParams, setParams } = useUrlState();

  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const limitRaw = parseInt(searchParams.get('limit') || '10', 10);
  const limit = [10, 20, 50].includes(limitRaw) ? limitRaw : 10;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const order = searchParams.get('order') || 'asc';

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const requestIdRef = useRef(0);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const loadProducts = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError('');
    try {
      const skip = (page - 1) * limit;
      const data = await getProducts({
        limit,
        skip,
        search: search || undefined,
        category: category || undefined,
      });

      if (requestId !== requestIdRef.current) return;

      const merged = applyOverlay(data.products);
      const sorted = sortProducts(merged, sortBy, order);

      setProducts(sorted);
      setTotal(data.total);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(err.message || 'Failed to load products');
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, [page, limit, search, category, sortBy, order]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleFilterChange = (updates) => setParams(updates);
  const handlePageChange = (newPage) => setParams({ page: newPage });
  const handleLimitChange = (newLimit) => setParams({ limit: newLimit, page: 1 });
  const handleSearchChange = (q) => setParams({ search: q, page: 1 });

  const handleDeleteClick = (product) => setConfirm(product);

  const handleConfirmDelete = async () => {
    if (!confirm || deleting) return;
    setDeleting(true);
    deleteProduct(confirm.id);
    setConfirm(null);
    setDeleting(false);
    loadProducts();
  };

  return (
    <AuthGuard>
      <Navbar />
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-4">
          <SearchBar value={search} onChange={handleSearchChange} />
          <Filters
            categories={categories}
            category={category}
            sortBy={sortBy}
            order={order}
            search={search}
            onChange={handleFilterChange}
          />
        </div>

        {loading && <Loader />}
        {!loading && error && <ErrorState message={error} onRetry={loadProducts} />}
        {!loading && !error && products.length === 0 && (
          <EmptyState message="No products found" />
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <ProductTable products={products} onDelete={handleDeleteClick} />
            <ProductCards products={products} onDelete={handleDeleteClick} />
            <Pagination
              total={total}
              page={page}
              limit={limit}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          </>
        )}
      </main>

      <ConfirmDialog
        open={!!confirm}
        title="Delete product"
        message={`Are you sure you want to delete "${confirm?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirm(null)}
        loading={deleting}
      />
    </AuthGuard>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loader center />}>
      <ProductsPageContent />
    </Suspense>
  );
}