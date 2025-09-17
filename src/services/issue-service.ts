/**
 * @fileOverview A service for managing issues in-memory for the prototype.
 * This acts as a mock database.
 */
import { issues as initialIssues } from '@/lib/data';
import type { Issue, User } from '@/lib/types';

// In-memory store for issues. It starts with the mock data.
let issues: Issue[] = [...initialIssues];

// In a real app, you'd have a proper user session. For now, we'll use a mock user.
const mockUser: Pick<User, 'id' | 'name' | 'avatarUrl'> = {
    id: 'user-1',
    name: 'Alice Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-1',
};

/**
 * Retrieves the current list of all issues.
 * @returns A promise that resolves to the array of issues.
 */
export async function getIssues(): Promise<Issue[]> {
  // Simulate async operation
  return Promise.resolve(issues);
}

/**
 * Adds a new issue to the in-memory store.
 * @param data The data for the new issue.
 * @returns A promise that resolves to the newly created issue.
 */
export async function addIssue(data: {
  title: string;
  description: string;
  category: Issue['category'];
  location: string;
  mediaDataUri?: string;
}): Promise<Issue> {
  const newIdNumber = issues.length + 1;
  const newIssue: Issue = {
    id: `ISS-${String(newIdNumber).padStart(3, '0')}`,
    title: data.title,
    description: data.description,
    category: data.category,
    status: 'Reported',
    priority: 'Medium', // Default priority
    location: {
      address: data.location || 'Not specified',
      lat: 23.8388 + (Math.random() - 0.5) * 0.1, // Randomize location slightly around Sagar
      lng: 78.7378 + (Math.random() - 0.5) * 0.1,
    },
    imageUrl: data.mediaDataUri,
    upvotes: 0,
    reportedBy: mockUser,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    timeline: [{ status: 'Reported', timestamp: new Date().toISOString() }],
  };

  issues = [newIssue, ...issues];
  
  // Simulate async operation
  return Promise.resolve(newIssue);
}
