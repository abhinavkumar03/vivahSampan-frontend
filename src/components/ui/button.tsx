'use client';
import * as React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export default function Button({ loading, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={`px-4 py-2 rounded border ${rest.className ?? ''}`}
    >
      {loading ? '…' : children}
    </button>
  );
}
