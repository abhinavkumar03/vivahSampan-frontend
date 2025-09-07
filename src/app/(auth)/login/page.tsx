'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { sendOtp as apiSendOtp, verifyOtp as apiVerifyOtp } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState<'enter' | 'code'>('enter');

  const OTP_LEN = 6;
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LEN).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // simple resend cooldown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  // helpers
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim().toLowerCase());
  const normalizePhone = (v: string) => {
    const digits = v.replace(/[^\d+]/g, '');
    if (/^\d{10}$/.test(digits)) return `+91${digits}`;
    return digits.startsWith('+') ? digits : digits;
  };
  const isPhone = (v: string) => /^\+?\d{8,15}$/.test(normalizePhone(v));

  const prettyIdentifier = useMemo(() => {
    if (isEmail(identifier)) return identifier.trim().toLowerCase();
    if (isPhone(identifier)) return normalizePhone(identifier);
    return identifier.trim();
  }, [identifier]);

  const payloadForId = () => {
    if (isEmail(prettyIdentifier)) return { email: prettyIdentifier } as const;
    if (isPhone(prettyIdentifier)) return { phone: prettyIdentifier } as const;
    return null;
  };

  // API: send OTP via Nest backend
  const handleSendOtp = async (e?: FormEvent) => {
    e?.preventDefault();
    const idPayload = payloadForId();
    if (!idPayload) return toast('Enter a valid email or phone number');

    try {
      setSending(true); console.log('Sending OTP to', idPayload);
      const res = await apiSendOtp(idPayload); // { success, message }
      toast(res.message || 'OTP sent successfully');
      setStep('code');
      setOtpDigits(Array(OTP_LEN).fill(''));
      setSecondsLeft(30); // frontend cooldown; backend handles real expiry
      setTimeout(() => inputsRef.current[0]?.focus(), 0);
    } catch (err: any) {
      toast(err?.message || 'Failed to send OTP');
    } finally {
      setSending(false);
    }
  };

  // API: verify OTP via Nest backend
  const handleVerifyOtp = async () => {
    const code = otpDigits.join('');
    if (code.length !== OTP_LEN || /\D/.test(code)) return toast('Enter the 6-digit code');

    const idPayload = payloadForId();
    if (!idPayload) return toast('Enter a valid email or phone number');

    try {
      setVerifying(true);
      const res = await apiVerifyOtp({ ...(idPayload as any), otp: code }); // { success, message, access_token? }
      if (res?.access_token) localStorage.setItem('token', res.access_token);
      toast(res?.message || 'OTP verified successfully');
      router.push('/');
    } catch (err: any) {
      toast(err?.message || 'Invalid or expired OTP');
    } finally {
      setVerifying(false);
    }
  };

  // OTP field UX
  const onOtpChange = (idx: number, v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[idx] = d;
      return next;
    });
    if (d && idx < OTP_LEN - 1) inputsRef.current[idx + 1]?.focus();
  };
  const onOtpKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === 'ArrowLeft' && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < OTP_LEN - 1) inputsRef.current[idx + 1]?.focus();
  };
  const onOtpPaste = (e: ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LEN);
    if (!text) return;
    e.preventDefault();
    const arr = Array(OTP_LEN)
      .fill('')
      .map((_, i) => text[i] ?? '');
    setOtpDigits(arr);
    const nextIdx = Math.min(text.length, OTP_LEN - 1);
    setTimeout(() => inputsRef.current[nextIdx]?.focus(), 0);
  };

  const editIdentifier = () => {
    setStep('enter');
    setOtpDigits(Array(OTP_LEN).fill(''));
    setSecondsLeft(0);
  };

  return (
    // Sweet pink background wash (no dark mode)
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 text-slate-900">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 md:gap-10 md:py-16">
        {/* LEFT: Visual */}
        <section aria-hidden className="hidden items-center md:flex">
          <div className="w-full rounded-2xl border border-pink-200 bg-white p-8 shadow-sm">
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 text-xl font-bold text-white">
                V
              </span>
              <span className="text-2xl font-semibold">VivahSampan</span>
            </div>

            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="mt-3 max-w-md text-slate-600">
              Sign in to continue planning: track vendors, budgets, checklists and timelines — all in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Dashboard', 'Vendors', 'Budget', 'Checklist', 'Timeline', 'Invites'].map((chip) => (
                <span
                  key={chip}
                  className="rounded-xl border border-pink-200 bg-white px-3 py-1.5 text-xs font-medium text-pink-700"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-pink-200 bg-white p-4">
                <div className="text-sm font-semibold">Tasks</div>
                <div className="mt-2 text-2xl font-bold">8 left</div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-pink-100">
                  <div className="h-full w-2/3 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500" />
                </div>
              </div>
              <div className="rounded-2xl border border-pink-200 bg-white p-4">
                <div className="text-sm font-semibold">Vendors</div>
                <div className="mt-2 text-2xl font-bold">12 booked</div>
                <div className="mt-1 text-xs text-slate-600">Caterer pending quote</div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: OTP Login */}
        <section className="flex items-center">
          <div className="w-full">
            <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
              <div className="h-1 w-full rounded bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500" />
              <div className="pt-6">
                <h1 className="text-2xl font-bold sm:text-3xl">Sign in with OTP</h1>
                <p className="mt-2 text-sm text-slate-600">We’ll send a 6-digit code to your email or phone.</p>

                {step === 'enter' ? (
                  <form onSubmit={handleSendOtp} className="mt-6 space-y-4" noValidate>
                    <div>
                      <label htmlFor="identifier" className="mb-1 block text-sm font-medium">
                        Email or phone
                      </label>
                      <Input
                        id="identifier"
                        name="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="you@example.com or +91 98765 43210"
                        autoFocus
                        autoComplete="username"
                        className="w-full rounded-xl border border-pink-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20"
                      />
                    </div>

                    <Button
                      type="submit"
                      loading={sending}
                      disabled={sending}
                      className="w-full rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 py-3 font-semibold text-white shadow-sm transition-transform hover:translate-y-[-1px] focus-visible:ring-4 focus-visible:ring-pink-500/30"
                    >
                      Send OTP
                    </Button>

                    <p className="text-center text-xs text-slate-600">
                      New to VivahSampan?{' '}
                      <Link href="/signup" className="font-medium text-pink-600 hover:text-pink-500">
                        Create an account
                      </Link>
                    </p>
                  </form>
                ) : (
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-xl border border-pink-300 px-3 py-1.5 text-xs text-slate-700">
                        {prettyIdentifier}
                      </div>
                      <button
                        type="button"
                        onClick={editIdentifier}
                        className="text-xs font-medium text-pink-600 hover:text-pink-500"
                      >
                        Edit
                      </button>
                    </div>

                    <div
                      role="group"
                      aria-label="One-time password"
                      onPaste={onOtpPaste}
                      className="grid grid-cols-6 gap-2"
                    >
                      {otpDigits.map((d, i) => (
                        <input
                          key={i}
                          ref={(el) => (inputsRef.current[i] = el)}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          autoComplete="one-time-code"
                          maxLength={1}
                          value={d}
                          onChange={(e) => onOtpChange(i, e.target.value)}
                          onKeyDown={(e) => onOtpKeyDown(i, e)}
                          className="h-12 w-full rounded-xl border border-pink-300 bg-white text-center text-lg font-semibold text-slate-900 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20"
                        />
                      ))}
                    </div>

                    <div className="space-y-3">
                      <Button
                        type="button"
                        onClick={handleVerifyOtp}
                        loading={verifying}
                        disabled={verifying}
                        className="w-full rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 py-3 font-semibold text-white shadow-sm transition-transform hover:translate-y-[-1px] focus-visible:ring-4 focus-visible:ring-pink-500/30"
                      >
                        Verify & Continue
                      </Button>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Didn’t get the code?</span>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={secondsLeft > 0 || sending}
                          className={`font-medium ${
                            secondsLeft > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-pink-600 hover:text-pink-500'
                          }`}
                        >
                          {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : 'Resend OTP'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-600">
              Back to{' '}
              <Link href="/" className="font-medium text-pink-600 hover:text-pink-500">
                home
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
