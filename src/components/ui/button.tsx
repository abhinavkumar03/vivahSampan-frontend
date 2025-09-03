'use client';
import * as React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export default function Button({ loading, children, className, ...rest }: Props) {
  return (
    <>
      <button
        {...rest}
        disabled={loading || rest.disabled}
        className={`btn ${className ?? ''}`}
      >
        {loading ? (
          <span className="btn__loader" aria-hidden="true" />
        ) : null}
        <span className="btn__label" aria-hidden={!!loading}>
          {children}
        </span>
      </button>

      <style jsx>{`
        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          padding: .75rem 1rem;
          border: 0;
          border-radius: .75rem;
          font-weight: 600;
          background: linear-gradient(135deg, #6c5ce7, #a66cff);
          color: white;
          cursor: pointer;
          transition: transform .06s ease, filter .2s ease, box-shadow .2s ease;
          box-shadow: 0 8px 20px rgba(108,92,231,.3);
        }
        .btn:hover { filter: brightness(1.05); }
        .btn:active { transform: translateY(1px); }
        .btn:disabled {
          opacity: .6;
          cursor: not-allowed;
          box-shadow: none;
        }
        .btn__loader {
          width: 1rem;
          height: 1rem;
          border: 3px solid rgba(255,255,255,.4);
          border-top-color: #fff;
          border-radius: 999px;
          animation: spin .8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
