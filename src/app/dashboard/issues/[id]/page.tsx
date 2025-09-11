import Image from 'next/image';
import { issues, users } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, MapPin, MessageCircle, Send } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const statusColors: { [key: string]: string } = {
  Reported: 'border-blue-500 text-blue-500',
  'In Progress': 'border-yellow-500 text-yellow-500',
  Resolved: 'border-green-500 text-green-500',
  Rejected: 'border-red-500 text-red-500',
};

const statusBgColors: { [key: string]: string } = {
    Reported: 'bg-blue-500',
    'In Progress': 'bg-yellow-500',
    Resolved: 'bg-green-500',
    Rejected: 'bg-red-500',
  };

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const issue = issues.find(i => i.id === params.id);

  if (!issue) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Issue Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Badge variant="secondary">{issue.category}</Badge>
                  <CardTitle className="text-2xl md:text-3xl font-bold">{issue.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground pt-1">
                    <MapPin className="mr-1.5 h-4 w-4" />
                    <span>{issue.location.address}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <Button variant="outline" className="w-full gap-2">
                        <ArrowUp className="h-4 w-4" />
                        Upvote ({issue.upvotes})
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>{issue.comments.length} comments</span>
                    </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {issue.imageUrl && (
                <div className="relative my-4 aspect-video w-full overflow-hidden rounded-lg border">
                  <Image src={issue.imageUrl} alt={issue.title} fill className="object-cover" data-ai-hint={issue.imageHint} />
                </div>
              )}
              <p className="text-foreground/80 leading-relaxed">{issue.description}</p>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle>Community Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={users[0].avatarUrl} />
                    <AvatarFallback>{users[0].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <Textarea placeholder="Add your comment..." className="mb-2" />
                    <Button size="sm" className="gap-2 float-right">
                        <Send className="h-4 w-4" />
                        Post Comment
                    </Button>
                  </div>
                </div>
                <Separator />
                {issue.comments.map(comment => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.author.avatarUrl} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{comment.author.name}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(comment.createdAt), "PPp")}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Reported By</span>
                        <span className="font-medium flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={issue.reportedBy.avatarUrl} />
                                <AvatarFallback>{issue.reportedBy.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {issue.reportedBy.name}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Reported On</span>
                        <span className="font-medium">{format(new Date(issue.createdAt), "PPP")}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span className="font-medium">{format(new Date(issue.updatedAt), "PPP")}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority</span>
                        <Badge variant="outline">{issue.priority}</Badge>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Issue ID</span>
                        <span className="font-mono text-xs">{issue.id}</span>
                    </div>
                </CardContent>
            </Card>
          <Card>
            <CardHeader>
              <CardTitle>Issue Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                {issue.timeline.map((update, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className={cn("flex h-8 w-8 items-center justify-center rounded-full border-2", statusColors[update.status])}>
                            <div className={cn("h-4 w-4 rounded-full", statusBgColors[update.status])} />
                        </div>
                        {index < issue.timeline.length - 1 && <div className="w-px h-full bg-border" />}
                    </div>
                    <div>
                      <p className="font-semibold">{update.status}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(update.timestamp), "PPp")}</p>
                      {update.notes && <p className="mt-1 text-sm">{update.notes}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
