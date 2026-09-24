'use client';

export default function Filters({ categories, category, sortBy, order, search, onChange }) {
    return (
        <div className="flex flex-wrap gap-3 items-center">
            <select
                value={category}
                disabled={!!search}
                onChange={(e) => onChange({ category: e.target.value, page: 1 })}
                className="border rounded px-3 py-2 disabled:bg-gray-100"
            >
                <option value="">All Categories</option>
                {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <select
                value={sortBy}
                onChange={(e) => onChange({ sortBy: e.target.value, page: 1 })}
                className="border rounded px-3 py-2"
            >
                <option value="">Sort by</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="title">Title</option>
            </select>

            <select
                value={order}
                onChange={(e) => onChange({ order: e.target.value, page: 1 })}
                className="border rounded px-3 py-2"
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            {search && (
                <span className="text-sm text-gray-500">
                    Clear search to use category filter
                </span>
            )}
        </div>
    );
}