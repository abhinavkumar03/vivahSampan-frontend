'use client';
import * as React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export default function Input({ label, error, hint, className, id, ...rest }: Props) {
  const inputId = id ?? React.useId();

  return (
    <>
      <label htmlFor={inputId} className="field">
        {label ? <span className="field__label">{label}</span> : null}
        <input
          id={inputId}
          {...rest}
          className={`field__input ${className ?? ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        />
        {hint && !error ? (
          <span id={`${inputId}-hint`} className="field__hint">{hint}</span>
        ) : null}
        {error ? (
          <span id={`${inputId}-error`} className="field__error">{error}</span>
        ) : null}
      </label>

      <style jsx>{`
        .field { display: grid; gap: .4rem; }
        .field__label { font-size: .9rem; color: #5b5b5b; }
        .field__input {
          width: 100%;
          padding: .75rem .9rem;
          border-radius: .7rem;
          border: 1px solid #e3e3e3;
          background: #fff;
          outline: none;
          transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
        }
        .field__input:hover { border-color: #cfcfcf; }
        .field__input:focus {
          border-color: #7c6af0;
          box-shadow: 0 0 0 4px rgba(124,106,240,.15);
        }
        .field__hint { color: #777; font-size: .8rem; }
        .field__error { color: #e11d48; font-size: .8rem; }
        [aria-invalid="true"].field__input {
          border-color: #e11d48;
          box-shadow: 0 0 0 4px rgba(225,29,72,.12);
        }
      `}</style>
    </>
  );
}
