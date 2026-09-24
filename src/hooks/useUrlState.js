'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export default function useUrlState() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const setParams = useCallback(
        (updates) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, value]) => {
                if (value === null || value === undefined || value === '') {
                    params.delete(key);
                } else {
                    params.set(key, String(value));
                }
            });
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [searchParams, router, pathname]
    );

    return { searchParams, setParams };
}