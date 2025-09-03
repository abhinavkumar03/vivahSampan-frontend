'use client';
import * as React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function PasswordInput({ label, error, className, id, ...rest }: Props) {
  const [visible, setVisible] = React.useState(false);
  const inputId = id ?? React.useId();

  return (
    <>
      <label htmlFor={inputId} className="pfield">
        {label ? <span className="pfield__label">{label}</span> : null}
        <div className="pfield__wrap">
          <input
            id={inputId}
            type={visible ? 'text' : 'password'}
            {...rest}
            className={`pfield__input ${className ?? ''}`}
            aria-invalid={!!error}
          />
          <button
            type="button"
            className="pfield__toggle"
            onClick={() => setVisible(v => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? 'Hide' : 'Show'}
          </button>
        </div>
        {error ? <span className="pfield__error">{error}</span> : null}
      </label>

      <style jsx>{`
        .pfield { display: grid; gap: .4rem; }
        .pfield__label { font-size: .9rem; color: #5b5b5b; }
        .pfield__wrap {
          position: relative;
          display: grid;
        }
        .pfield__input {
          width: 100%;
          padding: .75rem 3.2rem .75rem .9rem;
          border-radius: .7rem;
          border: 1px solid #e3e3e3;
          background: #fff;
          outline: none;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .pfield__input:hover { border-color: #cfcfcf; }
        .pfield__input:focus {
          border-color: #7c6af0;
          box-shadow: 0 0 0 4px rgba(124,106,240,.15);
        }
        .pfield__toggle {
          position: absolute;
          right: .5rem;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          padding: .35rem .6rem;
          border-radius: .5rem;
          cursor: pointer;
          font-weight: 600;
          color: #6c5ce7;
        }
        .pfield__toggle:hover { background: rgba(108,92,231,.08); }
        .pfield__error { color: #e11d48; font-size: .8rem; }
      `}</style>
    </>
  );
}
