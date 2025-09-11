'use client';

import { useState, useMemo } from 'react';
import type { Issue } from '@/lib/types';
import { IssueCard } from '@/components/issue-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { issues as allIssues, issueCategories } from '@/lib/data';
import { ListFilter, Search } from 'lucide-react';

type SortOption = 'recent' | 'upvoted' | 'commented' | 'urgent';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [sortLabel, setSortLabel] = useState('Most Recent');

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = allIssues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            issue.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortOption) {
      case 'upvoted':
        filtered.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'commented':
        filtered.sort((a, b) => b.comments.length - a.comments.length);
        break;
      case 'urgent':
        const priorityOrder: { [key: string]: number } = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        filtered.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortOption]);

  const handleSortChange = (option: SortOption, label: string) => {
    setSortOption(option);
    setSortLabel(label);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Community Issue Feed</h1>
        <p className="mt-1 text-muted-foreground">Browse, upvote, and comment on issues reported by the community.</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search issues by title or description..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {issueCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ListFilter className="h-4 w-4" />
                    {sortLabel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleSortChange('recent', 'Most Recent')}>Most Recent</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSortChange('upvoted', 'Most Upvoted')}>Most Upvoted</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSortChange('commented', 'Most Commented')}>Most Commented</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSortChange('urgent', 'Priority')}>Priority</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedIssues.length > 0 ? (
          filteredAndSortedIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
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
