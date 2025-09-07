'use client';

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signupSchema, type SignupInput } from '@/features/auth/server/schemas';
import { postJson } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import Button from '@/components/ui/button';

export default function SignupPage() {
  const router = useRouter();
  const toast = useToast();

  const [form, setForm] = useState<SignupInput>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) return toast('Please check your details.');
    try {
      setLoading(true);
      await postJson('auth/signup', form);
      toast('Account created! Please log in.');
      router.push('/auth/login');
    } catch (err: any) {
      toast(err?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // respect system theme (no toggle UI)
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-2 md:gap-10 md:py-16">
        {/* LEFT: Signup form */}
        <section className="flex items-center">
          <div className="w-full">
            <div className="mb-6 hidden items-center gap-2 md:flex">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-rose-500 to-fuchsia-500 text-white">V</span>
              <span className="text-xl font-semibold">VivahSampan</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <div className="h-1 w-full rounded bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-400" />
              <div className="pt-6">
                <h1 className="text-2xl font-bold sm:text-3xl">Create your account</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  First time here? Let’s set up your VivahSampan account.
                </p>

                <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4" noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-1 block text-sm font-medium">First name</label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={onChange}
                        placeholder="Aarav"
                        autoFocus
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 dark:border-white/10 dark:bg-slate-950"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-1 block text-sm font-medium">Last name</label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={onChange}
                        placeholder="Sharma"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 dark:border-white/10 dark:bg-slate-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 dark:border-white/10 dark:bg-slate-950"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
                    <PasswordInput
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      placeholder="Create a strong password"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 dark:border-white/10 dark:bg-slate-950"
                    />
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      At least 8 characters with letters & numbers.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    className="mt-2 w-full rounded-xl bg-gradient-to-r from-rose-600 via-fuchsia-600 to-amber-500 py-3 font-semibold text-white shadow-sm focus-visible:ring-4 focus-visible:ring-rose-500/30"
                  >
                    Create account
                  </Button>

                  <p className="text-center text-xs text-slate-600 dark:text-slate-400">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500">Log in</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Visual */}
        <section aria-hidden className="hidden items-center md:flex">
          <div className="w-full rounded-2xl border border-slate-200 bg-gradient-to-br from-rose-50 via-white to-fuchsia-50 p-8 shadow-sm dark:border-white/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-fuchsia-500 text-xl font-bold text-white">V</span>
              <span className="text-2xl font-semibold">VivahSampan</span>
            </div>

            <h2 className="text-3xl font-bold">Plan your dream day</h2>
            <p className="mt-3 max-w-md text-slate-700 dark:text-slate-300">
              One-stop solution to manage guests, vendors, budgets, checklists and more — beautifully.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Guest List', 'Vendors', 'Budget', 'Checklist', 'Invites', 'Venue'].map((chip) => (
                <span key={chip} className="rounded-xl border border-rose-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-700 dark:border-white/10 dark:bg-slate-900 dark:text-rose-200">
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-rose-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
                <div className="text-sm font-semibold">Wedding Day</div>
                <div className="mt-2 text-2xl font-bold">23 Nov 2025</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">Ceremony • 5:00 PM</div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <div className="h-full w-2/3 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-400" />
                </div>
              </div>

              <div className="rounded-2xl border border-rose-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
                <div className="text-sm font-semibold">Budget</div>
                <div className="mt-2 text-2xl font-bold">₹8.4L / ₹12L</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">70% allocated • on track</div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <div className="h-full w-[70%] bg-gradient-to-r from-emerald-500 to-amber-400" />
                </div>
              </div>
            </div>

            <div className="mt-8 text-sm">
              <div className="font-semibold">120+ weddings planned</div>
              <div className="text-slate-600 dark:text-slate-400">Trusted by couples across India</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
