'use client';

import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Issue } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

interface MapProps {
  center: { lat: number; lng: number };
  issues: Issue[];
  selectedIssue: Issue | null;
  onMarkerClick: (issue: Issue) => void;
  onInfoWindowClose: () => void;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
    fullscreenControl: true,
};

function MapComponent({ center, issues, selectedIssue, onMarkerClick, onInfoWindowClose }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={mapOptions}
    >
      {issues.map(issue => (
        <MarkerF
          key={issue.id}
          position={{ lat: issue.location.lat, lng: issue.location.lng }}
          onClick={() => onMarkerClick(issue)}
        />
      ))}

      {selectedIssue && (
        <InfoWindowF
          position={{ lat: selectedIssue.location.lat + 0.005, lng: selectedIssue.location.lng }}
          onCloseClick={onInfoWindowClose}
        >
          <Card className="w-64 border-none shadow-none">
            <CardHeader className="p-2">
              <CardTitle className="text-base">{selectedIssue.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-xs text-muted-foreground">{selectedIssue.location.address}</p>
            </CardContent>
            <CardFooter className="p-2">
                <Button asChild variant="link" size="sm" className="p-0 h-auto">
                    <Link href={`/dashboard/issues/${selectedIssue.id}`}>View Details</Link>
                </Button>
            </CardFooter>
          </Card>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

export default MapComponent;
