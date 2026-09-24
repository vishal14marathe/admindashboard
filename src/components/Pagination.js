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

    // Shared button styling
    const btnBase =
        'min-w-[38px] h-9 px-3 text-sm font-medium rounded-lg border transition ' +
        'disabled:opacity-40 disabled:cursor-not-allowed ' +
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200';

    const btnGhost =
        `${btnBase} bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300`;

    const btnActive =
        `${btnBase} bg-blue-600 border-blue-600 text-white shadow-sm hover:bg-blue-700`;

     
    const showLeftEllipsis = from > 1;
     
    const showRightEllipsis = to < totalPages;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
            {/* Left: results summary */}
            <span className="text-sm text-slate-500">
                Showing{' '}
                <span className="font-semibold text-slate-700">
                    {start}–{end}
                </span>{' '}
                of <span className="font-semibold text-slate-700">{total}</span>
            </span>

            {/* Center: pagination buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    className={btnGhost}
                >
                    ← Prev
                </button>

                {showLeftEllipsis && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className={page === 1 ? btnActive : btnGhost}
                        >
                            1
                        </button>
                        {from > 2 && (
                            <span className="px-1 text-slate-400 select-none">…</span>
                        )}
                    </>
                )}

                {pageNumbers.map((n) => (
                    <button
                        key={n}
                        onClick={() => onPageChange(n)}
                        className={n === page ? btnActive : btnGhost}
                        aria-current={n === page ? 'page' : undefined}
                    >
                        {n}
                    </button>
                ))}

                {showRightEllipsis && (
                    <>
                        {to < totalPages - 1 && (
                            <span className="px-1 text-slate-400 select-none">…</span>
                        )}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className={page === totalPages ? btnActive : btnGhost}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    className={btnGhost}
                >
                    Next →
                </button>
            </div>

            {/* Right: page size selector */}
            <div className="flex items-center gap-2">
                <label htmlFor="page-size" className="text-sm text-slate-500 whitespace-nowrap">
                    Rows per page
                </label>
                <select
                    id="page-size"
                    value={limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className="border border-slate-300 bg-white rounded-lg pl-3 pr-8 py-1.5 text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
}