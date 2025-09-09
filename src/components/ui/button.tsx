'use client';
import * as React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  loading,
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...rest
}: Props) {
  return (
    <>
      <button
        {...rest}
        disabled={loading || rest.disabled}
        className={`btn btn--${variant} btn--${size} ${className ?? ''}`}
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
          border-radius: 0.375rem;
          font-weight: 500;
          transition: all 150ms;
        }

        .btn--primary {
          background-color: #DB2777;
          color: white;
          border: 1px solid #DB2777;
        }
        .btn--primary:hover:not(:disabled) {
          background-color: #BE185D;
          border-color: #BE185D;
        }

        .btn--secondary {
          background-color: #F3F4F6;
          color: #1F2937;
          border: 1px solid #E5E7EB;
        }
        .btn--secondary:hover:not(:disabled) {
          background-color: #E5E7EB;
          border-color: #D1D5DB;
        }

        .btn--ghost {
          background-color: transparent;
          color: #6B7280;
          border: 1px solid transparent;
        }
        .btn--ghost:hover:not(:disabled) {
          background-color: #F3F4F6;
        }

        .btn--sm {
          padding: 0.375rem 0.625rem;
          font-size: 0.875rem;
        }
        .btn--md {
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
        }
        .btn--lg {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn__loader {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 1rem;
          height: 1rem;
          border: 2px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spin 750ms infinite linear;
        }

        .btn__label[aria-hidden="true"] {
          visibility: hidden;
        }

        @keyframes spin {
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
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
