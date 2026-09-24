'use client';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

export default function SearchBar({ value, onChange }) {
    const [local, setLocal] = useState(value || '');
    const debounced = useDebounce(local, 500);

    // Keep local in sync if URL changes externally
    useEffect(() => setLocal(value || ''), [value]);

    // Notify parent after debounce
    useEffect(() => {
        if (debounced !== value) onChange(debounced);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    return (
        <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Search products..."
            className="border rounded px-3 py-2 w-full md:w-72"
        />
    );
}