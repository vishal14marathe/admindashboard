'use client';
import { useState } from 'react';

const EMPTY = { title: '', price: '', category: '', description: '', stock: '', rating: '' };

export default function ProductForm({ initialValues, onSubmit, submitting, submitLabel = 'Save' }) {
    const [form, setForm] = useState({ ...EMPTY, ...initialValues });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = 'Title is required';
        if (!form.price || Number(form.price) <= 0) errs.price = 'Price must be greater than 0';
        if (!form.category.trim()) errs.category = 'Category is required';
        if (form.stock && Number(form.stock) < 0) errs.stock = 'Stock cannot be negative';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return; // prevent double-click
        if (!validate()) return;
        await onSubmit({
            ...form,
            price: Number(form.price),
            stock: Number(form.stock) || 0,
            rating: Number(form.rating) || 0,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="border rounded w-full px-3 py-2"
                />
                {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    className="border rounded w-full px-3 py-2"
                />
                {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border rounded w-full px-3 py-2"
                />
                {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    className="border rounded w-full px-3 py-2"
                />
                {errors.stock && <p className="text-red-600 text-sm">{errors.stock}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Rating (0-5)</label>
                <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={handleChange}
                    className="border rounded w-full px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                    className="border rounded w-full px-3 py-2"
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {submitting ? 'Saving...' : submitLabel}
            </button>
        </form>
    );
}