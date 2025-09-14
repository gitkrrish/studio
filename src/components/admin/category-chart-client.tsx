'use client';

import dynamic from 'next/dynamic';

export const CategoryChart = dynamic(
    () => import('@/components/admin/category-chart').then(mod => mod.CategoryChart),
    { ssr: false, loading: () => <div className="h-[438px] w-full rounded-lg bg-muted animate-pulse" /> }
);
