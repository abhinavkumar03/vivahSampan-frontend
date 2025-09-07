'use client';

import { listUsers } from '@/lib/api';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    // Replace with actual JWT from auth context
    const jwt = localStorage.getItem('jwt') || '';
    if (jwt) {
      listUsers(jwt).then(setUsers);
    }
  }, []);
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.map(u => (
          <li key={u.id} className="bg-white rounded shadow p-2 flex justify-between items-center">
            <span>{u.name} ({u.email})</span>
            <Button>View</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
