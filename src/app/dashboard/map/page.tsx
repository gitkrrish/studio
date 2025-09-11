'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function MapViewPage() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.894396263597!2d78.7501223149787!3d23.82273598466033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3978d132b775122b%3A0x25d57a8de14653f3!2sSagar%20Municipal%2C%20Corporation!5e0!3m2!1sen!2sin!4v1678886055555!5m2!1sen!2sin";

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Issue Map View</h1>
        <p className="mt-1 text-muted-foreground">Location of Sagar Municipal Corporation.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="relative h-[calc(100vh-220px)] w-full overflow-hidden rounded-lg">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
