import { issues } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';

export function RecentIssues() {
  const recentIssues = [...issues].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
        <CardDescription>The latest issues reported by citizens.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentIssues.map(issue => (
            <div key={issue.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={issue.reportedBy.avatarUrl} alt="Avatar" />
                <AvatarFallback>{issue.reportedBy.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <Link href={`/dashboard/issues/${issue.id}`} className="hover:underline">{issue.title}</Link>
                </p>
                <p className="text-sm text-muted-foreground">{issue.reportedBy.name}</p>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <Badge variant={issue.priority === 'Urgent' ? 'destructive' : 'outline'}>{issue.priority}</Badge>
                <div className="text-xs text-muted-foreground mt-1">{issue.status}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
