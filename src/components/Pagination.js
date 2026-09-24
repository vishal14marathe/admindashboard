'use client';

export default function Pagination({ total, page, limit, onPageChange, onLimitChange }) {
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    const pageNumbers = [];
    const maxButtons = 7;
    let from = Math.max(1, page - 3);
    let to = Math.min(totalPages, from + maxButtons - 1);
    from = Math.max(1, to - maxButtons + 1);
    for (let i = from; i <= to; i++) pageNumbers.push(i);

    return (
        <div className="flex flex-wrap items-center gap-3 justify-between mt-4">
            <span className="text-sm text-gray-600">
                Showing {start}-{end} of {total}
            </span>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {pageNumbers.map((n) => (
                    <button
                        key={n}
                        onClick={() => onPageChange(n)}
                        className={`px-3 py-1 border rounded ${n === page ? 'bg-blue-600 text-white' : ''
                            }`}
                    >
                        {n}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <select
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
            >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
            </select>
        </div>
    );
}