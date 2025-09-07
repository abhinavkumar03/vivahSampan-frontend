'use client';

import { useState } from 'react';
import { uploadMedia } from '@/lib/api';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function MediaUploadPage() {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [success, setSuccess] = useState(false);
  const handleUpload = async () => {
    const jwt = localStorage.getItem('jwt') || '';
    const data = {
      vendorId: 1,
      type: 'image',
      url,
      metadata: { caption },
    };
    await uploadMedia(data, jwt);
    setSuccess(true);
  };
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Media</h1>
      <input className="mb-2 w-full p-2 border rounded" placeholder="Image URL" value={url} onChange={e => setUrl(e.target.value)} />
      <input className="mb-2 w-full p-2 border rounded" placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} />
      <Button onClick={handleUpload}>Upload</Button>
      {success && <div className="mt-2 text-green-600">Uploaded!</div>}
    </div>
  );
}
