'use client';

export default function Stars({ value = 0, size = 'md', showNumber = false }) {
    const rating = Math.max(0, Math.min(5, Number(value) || 0));

    const rounded = Math.round(rating * 2) / 2;

    const full = Math.floor(rounded);
    const hasHalf = rounded - full >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    const sizeClass =
        size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-base';

    return (
        <span
            className={`inline-flex items-center gap-1 ${sizeClass} leading-none`}
            aria-label={`${rating} out of 5 stars`}
            title={`${rating} out of 5`}
        >
            <span className="inline-flex text-amber-400 tracking-tight">
                {'★'.repeat(full)}
                {hasHalf && <span className="relative inline-block text-amber-400">★</span>}
                <span className="text-slate-300">{'★'.repeat(empty)}</span>
            </span>
            {showNumber && (
                <span className="text-xs text-slate-500 font-medium">{rating.toFixed(1)}</span>
            )}
        </span>
    );
}