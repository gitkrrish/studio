
'use client';
import 'leaflet/dist/leaflet.css';
import type { Issue } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { useMap, Marker as LeafletMarker, Popup as LeafletPopup } from 'react-leaflet';
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

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

function InteractiveMap({ center, issues, selectedIssue, onMarkerClick, onPopupClose, zoom = 13 }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);
    const popupRef = useRef<L.Popup | null>(null);

    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {
            // Initialize map only once
            const map = L.map(mapRef.current).setView(center, zoom);
            mapInstanceRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }

        const map = mapInstanceRef.current;
        if (map) {
            // Cleanup existing markers
            markersRef.current.forEach(marker => marker.removeFrom(map));
            markersRef.current = [];

            // Add new markers
            issues.forEach(issue => {
                const marker = L.marker([issue.location.lat, issue.location.lng]).addTo(map);
                marker.on('click', () => onMarkerClick(issue));
                markersRef.current.push(marker);
            });
        }
        
        return () => {
             if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };

    }, [center, zoom, issues, onMarkerClick]);

     useEffect(() => {
        const map = mapInstanceRef.current;
        if (map) {
            // Close existing popup if any
            if (popupRef.current) {
                popupRef.current.remove();
                popupRef.current = null;
            }

            if (selectedIssue) {
                 const popupContent = ReactDOMServer.renderToString(
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
                );

                const popup = L.popup()
                    .setLatLng([selectedIssue.location.lat, selectedIssue.location.lng])
                    .setContent(popupContent)
                    .on('remove', onPopupClose)
                    .openOn(map);

                popupRef.current = popup;
            }
        }
    }, [selectedIssue, onPopupClose]);


  return (
    <div ref={mapRef} style={{ height: '100%', width: '100%' }}>
    </div>
  );
}

export default InteractiveMap;
