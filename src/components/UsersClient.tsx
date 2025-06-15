'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import UserTable from '@/components/UserTable';

interface UsersClientProps {
  initialUsers: User[];
}

/**
 * Client component that handles user state management
 * This allows us to use server-side rendering for initial data
 * while maintaining client-side interactivity
 */
function UsersClient({ initialUsers }: UsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDeleteUser = (userId: number): void => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <UserTable users={users} onDeleteUser={handleDeleteUser} />
  );
}

export default UsersClient;
