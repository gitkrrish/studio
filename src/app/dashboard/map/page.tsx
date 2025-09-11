import { Card, CardContent } from '@/components/ui/card';
import { issues } from '@/lib/data';
import { MapPin } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// A simple psuedo-random number generator for positioning
const seededRandom = (seed: number) => {
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;
    let state = seed;
    return () => {
        state = (a * state + c) % m;
        return state / m;
    }
}


export default function MapViewPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Issue Map View</h1>
        <p className="mt-1 text-muted-foreground">Visualize reported issues on the map.</p>
      </div>
      <Card>
        <CardContent className="p-0">
           <TooltipProvider>
            <div className="relative h-[calc(100vh-250px)] w-full overflow-hidden rounded-lg">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-50" 
                    style={{backgroundImage: "url('https://source.unsplash.com/random/1600x900/?map,city,aerial')"}}
                />
                <div className="absolute inset-0">
                {issues.map((issue, index) => {
                    const random = seededRandom(issue.location.lat + issue.location.lng);
                    const top = `${Math.floor(random() * 85) + 5}%`;
                    const left = `${Math.floor(random() * 90) + 5}%`;

                    return (
                        <Tooltip key={issue.id}>
                            <TooltipTrigger asChild>
                                <div 
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                    style={{ top, left }}
                                >
                                    <MapPin className="h-8 w-8 text-primary fill-primary/50 stroke-background" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="font-semibold">{issue.title}</p>
                                <p className="text-sm text-muted-foreground">{issue.location.address}</p>
                            </TooltipContent>
                        </Tooltip>
                    )
                })}
                </div>
            </div>
           </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
