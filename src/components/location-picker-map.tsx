
'use client';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

import L, { LatLng } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Button } from './ui/button';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
const defaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

interface LocationPickerMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export function LocationPickerMap({
  onLocationSelect,
  initialCenter = [23.8388, 78.7378], // Default to Sagar, MP
  initialZoom = 13,
}: LocationPickerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [markerPosition, setMarkerPosition] = useState<LatLng>(new LatLng(initialCenter[0], initialCenter[1]));

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView(initialCenter, initialZoom);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Search control
      const provider = new OpenStreetMapProvider();
      const searchControl = GeoSearchControl({
        provider: provider,
        style: 'bar',
        showMarker: false,
        autoClose: true,
      });
      map.addControl(searchControl);
      
      map.on('geosearch/showlocation', (result: any) => {
        const { x, y } = result.location;
        const newPos = new LatLng(y, x);
        map.setView(newPos, 16);
        setMarkerPosition(newPos);
      });

      // Draggable marker
      const marker = L.marker(initialCenter, { draggable: true, icon: defaultIcon }).addTo(map);
      markerRef.current = marker;

      marker.on('dragend', (event) => {
        setMarkerPosition(event.target.getLatLng());
      });
      
       map.on('click', (e) => {
        setMarkerPosition(e.latlng);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initialCenter, initialZoom]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(markerPosition);
    }
    onLocationSelect(markerPosition.lat, markerPosition.lng);
  }, [markerPosition, onLocationSelect]);

  const goToCurrentLocation = () => {
    if (navigator.geolocation && mapInstanceRef.current) {
      const map = mapInstanceRef.current;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos = new LatLng(latitude, longitude);
          map.setView(newPos, 16);
          setMarkerPosition(newPos);
        },
        () => {
          alert('Could not get your location.');
        }
      );
    }
  };


  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      <div className="absolute top-2.5 right-12 z-[1000]">
        <Button onClick={goToCurrentLocation} size="sm">Use My Location</Button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-background/80 p-2 rounded-md shadow-lg text-xs text-center">
        Drag the marker or click on the map to set the issue location.
      </div>
    </div>
  );
}
