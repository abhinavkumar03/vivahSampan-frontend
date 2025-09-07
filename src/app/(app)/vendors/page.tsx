'use client';

import { useEffect, useState } from 'react';
import { getVendor } from '@/lib/api';
import Button from '@/components/ui/button';

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  useEffect(() => {
    // Example: fetch vendor with id 1, extend for list
    const jwt = localStorage.getItem('jwt') || '';
    getVendor(1, jwt).then(v => setVendors([v]));
  }, []);
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vendors</h1>
      <ul className="space-y-2">
        {vendors.map(v => (
          <li key={v.id} className="bg-white rounded shadow p-2 flex justify-between items-center">
            <span>{v.name} ({v.category})</span>
            <Button>View</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
