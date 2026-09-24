'use client';

const selectClass =
    'border border-slate-300 bg-white rounded-lg px-3 py-2 text-sm text-slate-700 ' +
    'focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none ' +
    'disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ' +
    'appearance-none bg-[url("data:image/svg+xml;utf8,<svg%20xmlns=\'http://www.w3.org/2000/svg\'%20width=\'12\'%20height=\'12\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20stroke=\'%2364748b\'%20stroke-width=\'2\'%20stroke-linecap=\'round\'%20stroke-linejoin=\'round\'><polyline%20points=\'6%209%2012%2015%2018%209\'/></svg>")] ' +
    'bg-no-repeat bg-[length:12px] bg-[right_0.75rem_center] pr-9';

export default function Filters({ categories, category, sortBy, order, search, onChange }) {
    return (
        <div className="flex flex-wrap gap-2 items-center">
            <select
                value={category}
                disabled={!!search}
                onChange={(e) => onChange({ category: e.target.value, page: 1 })}
                className={selectClass}
                title={search ? 'Clear search to filter by category' : 'Filter by category'}
            >
                <option value="">All Categories</option>
                {categories.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>

            <select
                value={sortBy}
                onChange={(e) => onChange({ sortBy: e.target.value, page: 1 })}
                className={selectClass}
            >
                <option value="">Sort by</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="title">Title</option>
            </select>

            <select
                value={order}
                onChange={(e) => onChange({ order: e.target.value, page: 1 })}
                className={selectClass}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            {search && (
                <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full whitespace-nowrap">
                    Clear search to filter by category
                </span>
            )}
        </div>
    );
}