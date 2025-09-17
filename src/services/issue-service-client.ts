/**
 * @fileOverview A client-side service for managing issues.
 * This is needed because client components cannot directly call server actions in a loop
 * or in useEffect. We create a separate server action that can be called from the client.
 */
'use server';

import { getIssues as getIssuesServer } from './issue-service';

// This function is marked as a server action, so it can be imported and called
// directly from client components.
export const getIssues = async () => {
  return getIssuesServer();
};
