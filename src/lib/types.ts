export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'citizen' | 'admin';
};

export type Comment = {
  id: string;
  text: string;
  createdAt: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>;
};

export type Status = 'Reported' | 'In Progress' | 'Resolved' | 'Rejected';
export type Category =
  | 'Roads & Highways'
  | 'Sanitation'
  | 'Public Safety'
  | 'Water & Sewage'
  | 'Parks & Recreation'
  | 'Other';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type StatusUpdate = {
  status: Status;
  timestamp: string;
  notes?: string;
};

export type Issue = {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: Status;
  priority: Priority;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  imageHint?: string;
  upvotes: number;
  reportedBy: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  assignedTo?: string; // Department ID
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  timeline: StatusUpdate[];
};
