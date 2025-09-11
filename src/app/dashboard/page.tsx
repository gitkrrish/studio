import type { Issue } from '@/lib/types';
import { IssueCard } from '@/components/issue-card';
import { issues as allIssues } from '@/lib/data';
import { CommunityFeedClient } from '@/components/community-feed-client';

type SortOption = 'recent' | 'upvoted' | 'commented' | 'urgent';

function sortIssues(issues: Issue[], sortOption: SortOption): Issue[] {
  switch (sortOption) {
    case 'upvoted':
      return [...issues].sort((a, b) => b.upvotes - a.upvotes);
    case 'commented':
      return [...issues].sort((a, b) => b.comments.length - a.comments.length);
    case 'urgent':
      const priorityOrder: { [key: string]: number } = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      return [...issues].sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
    case 'recent':
    default:
      return [...issues].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm = typeof searchParams.search === 'string' ? searchParams.search : '';
  const selectedCategory = typeof searchParams.category === 'string' ? searchParams.category : 'all';
  const sortOption = typeof searchParams.sort === 'string' ? (searchParams.sort as SortOption) : 'recent';

  const filteredIssues = allIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedIssues = sortIssues(filteredIssues, sortOption);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Community Issue Feed</h1>
        <p className="mt-1 text-muted-foreground">Browse, upvote, and comment on issues reported by the community.</p>
      </div>

      <CommunityFeedClient
        initialSearch={searchTerm}
        initialCategory={selectedCategory}
        initialSort={sortOption}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {sortedIssues.length > 0 ? (
          sortedIssues.map((issue, index) => (
            <IssueCard key={issue.id} issue={issue} priority={index < 3} />
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground py-12">
            <p className="text-lg font-semibold">No issues found.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
