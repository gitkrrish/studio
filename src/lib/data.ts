import type { Issue, User, Category } from '@/lib/types';

export const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-1', role: 'citizen' },
  { id: 'user-2', name: 'Bob Williams', email: 'bob@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-2', role: 'citizen' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=user-3', role: 'citizen' },
  { id: 'admin-1', name: 'AdminISTRATOR', email: 'admin@civicconnect.com', avatarUrl: 'https://i.pravatar.cc/150?u=admin-1', role: 'admin' },
];

export const issues: Issue[] = [
  {
    id: 'ISS-001',
    title: 'Major Pothole on Main St',
    description: 'A very large and dangerous pothole has formed in the middle of Main Street, near the intersection with 1st Ave. It has already caused damage to several vehicles. Needs immediate attention.',
    category: 'Roads & Highways',
    status: 'In Progress',
    priority: 'Urgent',
    location: { address: '123 Main St, Anytown, USA', lat: 34.0522, lng: -118.2437 },
    imageUrl: 'https://picsum.photos/seed/pothole1/800/600',
    imageHint: 'pothole road',
    upvotes: 128,
    reportedBy: users[0],
    assignedTo: 'dept-roads',
    createdAt: '2024-07-20T10:00:00Z',
    updatedAt: '2024-07-21T14:30:00Z',
    comments: [
      { id: 'c-1', text: 'My tire got flattened by this yesterday!', author: users[1], createdAt: '2024-07-20T11:00:00Z' },
      { id: 'c-2', text: 'Seriously, this needs a fix ASAP.', author: users[2], createdAt: '2024-07-20T12:30:00Z' },
    ],
    timeline: [
        { status: 'In Progress', timestamp: '2024-07-21T14:30:00Z', notes: 'Assigned to crew A. Scheduled for repair.'},
        { status: 'Reported', timestamp: '2024-07-20T10:00:00Z' }
    ]
  },
  {
    id: 'ISS-002',
    title: 'Graffiti on Park Wall',
    description: 'Someone has spray-painted graffiti all over the new mural at Central Park. It\'s a shame to see it defaced so quickly.',
    category: 'Parks & Recreation',
    status: 'Reported',
    priority: 'Medium',
    location: { address: 'Central Park, Anytown, USA', lat: 34.055, lng: -118.245 },
    imageUrl: 'https://picsum.photos/seed/graffiti1/800/600',
    imageHint: 'graffiti wall',
    upvotes: 45,
    reportedBy: users[1],
    createdAt: '2024-07-19T15:20:00Z',
    updatedAt: '2024-07-19T15:20:00Z',
    comments: [
       { id: 'c-3', text: 'So sad to see this happen.', author: users[0], createdAt: '2024-07-20T18:00:00Z' },
    ],
    timeline: [
        { status: 'Reported', timestamp: '2024-07-19T15:20:00Z' }
    ]
  },
  {
    id: 'ISS-003',
    title: 'Trash cans overflowing at City Square',
    description: 'All the public trash cans in the city square are completely full and overflowing. It\'s creating a mess and attracting pests.',
    category: 'Sanitation',
    status: 'Resolved',
    priority: 'High',
    location: { address: 'City Square, Anytown, USA', lat: 34.050, lng: -118.240 },
    imageUrl: 'https://picsum.photos/seed/trash1/800/600',
    imageHint: 'overflowing trash',
    upvotes: 82,
    reportedBy: users[2],
    assignedTo: 'dept-sanitation',
    createdAt: '2024-07-18T09:00:00Z',
    updatedAt: '2024-07-18T16:00:00Z',
    comments: [],
    timeline: [
        { status: 'Resolved', timestamp: '2024-07-18T16:00:00Z', notes: 'All bins cleared by the evening crew.'},
        { status: 'In Progress', timestamp: '2024-07-18T11:00:00Z', notes: 'Dispatched a collection team.'},
        { status: 'Reported', timestamp: '2024-07-18T09:00:00Z' }
    ]
  },
  {
    id: 'ISS-004',
    title: 'Broken Streetlight',
    description: 'The streetlight at the corner of Oak & Pine has been out for three nights. It\'s very dark and feels unsafe.',
    category: 'Public Safety',
    status: 'Reported',
    priority: 'High',
    location: { address: 'Corner of Oak & Pine, Anytown, USA', lat: 34.060, lng: -118.250 },
    imageUrl: 'https://picsum.photos/seed/light1/800/600',
    imageHint: 'broken streetlight',
    upvotes: 67,
    reportedBy: users[0],
    createdAt: '2024-07-21T21:00:00Z',
    updatedAt: '2024-07-21T21:00:00Z',
    comments: [],
    timeline: [
        { status: 'Reported', timestamp: '2024-07-21T21:00:00Z' }
    ]
  },
  {
    id: 'ISS-005',
    title: 'Water main break',
    description: 'There appears to be a water main break on Elm Street. Water is bubbling up from the pavement and running down the gutter.',
    category: 'Water & Sewage',
    status: 'In Progress',
    priority: 'Urgent',
    location: { address: '456 Elm St, Anytown, USA', lat: 34.045, lng: -118.235 },
    imageUrl: 'https://picsum.photos/seed/leak1/800/600',
    imageHint: 'water leak',
    upvotes: 95,
    reportedBy: users[1],
    assignedTo: 'dept-water',
    createdAt: '2024-07-22T08:00:00Z',
    updatedAt: '2024-07-22T08:30:00Z',
    comments: [],
    timeline: [
        { status: 'In Progress', timestamp: '2024-07-22T08:30:00Z', notes: 'Emergency crew dispatched.'},
        { status: 'Reported', timestamp: '2024-07-22T08:00:00Z' }
    ]
  },
  {
    id: 'ISS-006',
    title: 'Damaged playground swing',
    description: 'One of the swings at the community playground is broken and hanging by a single chain. It\'s a safety hazard for children.',
    category: 'Parks & Recreation',
    status: 'Resolved',
    priority: 'Medium',
    location: { address: 'Community Playground, Anytown, USA', lat: 34.058, lng: -118.248 },
    imageUrl: 'https://picsum.photos/seed/swing1/800/600',
    imageHint: 'broken swing',
    upvotes: 33,
    reportedBy: users[2],
    assignedTo: 'dept-parks',
    createdAt: '2024-07-15T13:00:00Z',
    updatedAt: '2024-07-17T11:00:00Z',
    comments: [],
    timeline: [
        { status: 'Resolved', timestamp: '2024-07-17T11:00:00Z', notes: 'Swing has been replaced.'},
        { status: 'In Progress', timestamp: '2024-07-16T09:00:00Z', notes: 'Maintenance team scheduled a visit.'},
        { status: 'Reported', timestamp: '2024-07-15T13:00:00Z' }
    ]
  },
];

export const departments = [
    { id: 'dept-roads', name: 'Roads & Highways' },
    { id: 'dept-sanitation', name: 'Sanitation' },
    { id: 'dept-safety', name: 'Public Safety' },
    { id: 'dept-water', name: 'Water & Sewage' },
    { id: 'dept-parks', name: 'Parks & Recreation' },
    { id: 'dept-other', name: 'Other' },
];

export const issueCategories: Category[] = [
  'Roads & Highways',
  'Sanitation',
  'Public Safety',
  'Water & Sewage',
  'Parks & Recreation',
  'Other',
];
