'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import Button from '@/components/ui/button';
import { loginSchema } from '@/features/auth/server/schemas';
import { toast } from '@/hooks/use-toast';
import { postJson } from '@/lib/api';
import { z } from 'zod';
import { ROUTES } from '@/constants/routes';

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginValues) => {
    try {
      await postJson<{ token?: string; userId: string }>('api/v1/auth/login', data);
      toast('Logged in!');
      // router.push('/(app)');
    } catch {
      toast('Login failed');
    }
  };

  return (
    <div className="auth">
      {/* Left visual (desktop only) */}
      <aside className="auth__visual" aria-hidden>
        <div className="auth__visual-inner">
          <div className="brand">
            <div className="brand__logo" />
            <span>MyApp</span>
          </div>
          <h2>Welcome back 👋</h2>
          <p>Log in to continue your journey. Your projects, teams, and insights — all in one place.</p>
        </div>
      </aside>

      {/* Right form */}
      <section className="auth__form">
        <div className="auth-card">
          <header className="auth-card__head">
            <div className="brand">
              <div className="brand__logo" />
              <span>MyApp</span>
            </div>
            <h1 className="auth-card__title">Log in</h1>
            <p className="auth-card__subtitle">Enter your credentials to access your account.</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-grid" noValidate>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <PasswordInput
              label="Password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
            />

            <div className="auth__row">
              <span className="auth__muted">Trouble logging in?</span>
              <Link className="auth__link" href="#">Forgot password</Link>
            </div>

            <Button type="submit" loading={isSubmitting}>Continue</Button>

            <div className="auth__divider">or</div>

            {/* Social placeholders (wire up later if needed) */}
            <div className="auth__socials">
              <button type="button" className="btn">Continue with Google</button>
              <button type="button" className="btn">Continue with GitHub</button>
            </div>

            <p className="auth__muted">
              Don’t have an account?{' '}
              <Link className="auth__link" href={ROUTES.signup}>Sign up</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
