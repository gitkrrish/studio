import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUp, MapPin, MessageCircle } from 'lucide-react';
import type { Issue } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface IssueCardProps {
  issue: Issue;
}

const statusColors = {
  Reported: 'bg-blue-500',
  'In Progress': 'bg-yellow-500',
  Resolved: 'bg-green-500',
  Rejected: 'bg-red-500',
};

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold leading-tight">
            <Link href={`/dashboard/issues/${issue.id}`} className="hover:underline">
              {issue.title}
            </Link>
          </CardTitle>
          <Badge variant="secondary" className="whitespace-nowrap rounded-md px-2 py-1 text-xs">
            {issue.category}
          </Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground pt-1">
          <div className={cn("h-2 w-2 rounded-full mr-1.5", statusColors[issue.status])}></div>
          <span>{issue.status}</span>
          <span className="mx-1.5">•</span>
          <MapPin className="mr-1 h-3 w-3" />
          <span>{issue.location.address}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        {issue.imageUrl && (
          <Link href={`/dashboard/issues/${issue.id}`}>
            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md">
              <Image
                src={issue.imageUrl}
                alt={issue.title}
                fill
                className="object-cover transition-transform hover:scale-105"
                data-ai-hint={issue.imageHint}
              />
            </div>
          </Link>
        )}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {issue.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/50 p-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowUp className="h-4 w-4" />
            <span>{issue.upvotes}</span>
          </Button>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span>{issue.comments.length}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage src={issue.reportedBy.avatarUrl} alt={issue.reportedBy.name} />
            <AvatarFallback>{issue.reportedBy.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>
            Reported by {issue.reportedBy.name}{' '}
            {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
