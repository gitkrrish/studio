'use client';

import { Card, CardContent } from '@/components/ui/card';
import { issues } from '@/lib/data';
import type { Issue } from '@/lib/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const InteractiveMap = dynamic(() => import('@/components/interactive-map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted animate-pulse" />,
});


export default function AdminMapViewPage() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleMarkerClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handlePopupClose = () => {
    setSelectedIssue(null);
  };

  // Centered on Sagar, Madhya Pradesh, India
  const mapCenter: [number, number] = [23.8388, 78.7378];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="space-y-2 mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Issue Map</h2>
            <p className="text-muted-foreground">
                Geographical overview of all reported issues.
            </p>
        </div>
      <Card>
        <CardContent className="p-0">
          <div className="relative h-[calc(100vh-260px)] w-full overflow-hidden rounded-lg">
            <InteractiveMap
              center={mapCenter}
              issues={issues}
              selectedIssue={selectedIssue}
              onMarkerClick={handleMarkerClick}
              onPopupClose={handlePopupClose}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
