import { IssueCard } from '@/components/issue-card';
import { getIssues } from '@/services/issue-service';
import { users } from '@/lib/data';
import type { Issue, User } from '@/lib/types';

export default async function MyReportsPage() {
  // In a real app, you would get the current user from your authentication system.
  // For this example, we'll assume the logged-in user is the first user in our data.
  const currentUser: User = users[0];

  const allIssues = await getIssues();
  const userIssues: Issue[] = allIssues.filter(
    issue => issue.reportedBy.id === currentUser.id
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          My Reported Issues
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here are the issues you have reported to Civify.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {userIssues.length > 0 ? (
          userIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground py-12">
            <p className="text-lg font-semibold">You haven&apos;t reported any issues yet.</p>
            <p>Once you report an issue, it will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
