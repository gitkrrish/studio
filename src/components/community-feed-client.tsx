'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { issueCategories } from '@/lib/data';
import { ListFilter, Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

type SortOption = 'recent' | 'upvoted' | 'commented' | 'urgent';

interface CommunityFeedClientProps {
  initialSearch: string;
  initialCategory: string;
  initialSort: SortOption;
}

const sortOptions: { value: SortOption, label: string }[] = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'upvoted', label: 'Most Upvoted' },
    { value: 'commented', label: 'Most Commented' },
    { value: 'urgent', label: 'Priority' },
];

export function CommunityFeedClient({ initialSearch, initialCategory, initialSort }: CommunityFeedClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!debouncedSearchTerm) {
      current.delete('search');
    } else {
      current.set('search', debouncedSearchTerm);
    }

    if (selectedCategory === 'all') {
        current.delete('category');
    } else {
        current.set('category', selectedCategory);
    }

    if (sortOption === 'recent') {
        current.delete('sort');
    } else {
        current.set('sort', sortOption);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  }, [debouncedSearchTerm, selectedCategory, sortOption, pathname, router]);

  const sortLabel = sortOptions.find(opt => opt.value === sortOption)?.label || 'Most Recent';

  return (
    <Card>
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
            <Select onValueChange={(value) => setSelectedCategory(value)} value={selectedCategory}>
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
                {sortOptions.map(option => (
                    <DropdownMenuItem key={option.value} onClick={() => setSortOption(option.value)}>
                        {option.label}
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
