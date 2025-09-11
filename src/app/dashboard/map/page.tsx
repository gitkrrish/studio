'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { issues } from '@/lib/data';
import GoogleMap from '@/components/google-map';
import { LocateFixed } from 'lucide-react';
import type { Issue } from '@/lib/types';

export default function MapViewPage() {
  const [mapCenter, setMapCenter] = useState({ lat: 34.0522, lng: -118.2437 }); // Default to LA
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleMarkerClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setMapCenter({ lat: issue.location.lat, lng: issue.location.lng });
  };

  const handleInfoWindowClose = () => {
    setSelectedIssue(null);
  };

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert('Error: The Geolocation service failed.');
        }
      );
    } else {
      alert("Error: Your browser doesn't support geolocation.");
    }
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Issue Map View</h1>
            <p className="mt-1 text-muted-foreground">Visualize reported issues on the map.</p>
        </div>
        <Button onClick={getUserLocation} className="mt-4 md:mt-0">
          <LocateFixed className="mr-2 h-4 w-4" />
          Use My Location
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="relative h-[calc(100vh-250px)] w-full overflow-hidden rounded-lg">
            <GoogleMap
              center={mapCenter}
              issues={issues}
              selectedIssue={selectedIssue}
              onMarkerClick={handleMarkerClick}
              onInfoWindowClose={handleInfoWindowClose}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
