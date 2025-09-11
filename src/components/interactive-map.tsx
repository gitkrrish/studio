'use client';
import 'leaflet/dist/leaflet.css';
import { Issue } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const useMap = dynamic(() => import('react-leaflet').then(mod => mod.useMap), { ssr: false });


import L from 'leaflet';
// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapProps {
  center: [number, number];
  issues: Issue[];
  selectedIssue: Issue | null;
  onMarkerClick: (issue: Issue) => void;
  onPopupClose: () => void;
  zoom?: number;
}

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function InteractiveMap({ center, issues, selectedIssue, onMarkerClick, onPopupClose, zoom = 13 }: MapProps) {

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {issues.map(issue => (
        <Marker 
          key={issue.id} 
          position={[issue.location.lat, issue.location.lng]}
          eventHandlers={{
            click: () => {
              onMarkerClick(issue);
            },
          }}
        >
        </Marker>
      ))}

      {selectedIssue && (
          <Popup 
            position={[selectedIssue.location.lat, selectedIssue.location.lng]}
            onClose={onPopupClose}
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
          </Popup>
      )}
    </MapContainer>
  );
}

export default InteractiveMap;
