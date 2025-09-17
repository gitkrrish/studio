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


export default function MapViewPage() {
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
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Issue Map View</h1>
        <p className="mt-1 text-muted-foreground">Interactive map of all reported issues.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="relative h-[calc(100vh-220px)] w-full overflow-hidden rounded-lg">
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
