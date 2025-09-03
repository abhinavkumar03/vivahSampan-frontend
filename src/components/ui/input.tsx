'use client';
import * as React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string };

export default function Input({ label, error, ...rest }: Props) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm">{label}</span>}
      <input
        {...rest}
        className={`w-full border rounded px-3 py-2 ${rest.className ?? ''}`}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
