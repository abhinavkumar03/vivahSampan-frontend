'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import Button from '@/components/ui/button';
import { signupSchema } from '@/features/auth/server/schemas';
import { toast } from '@/hooks/use-toast';
import { postJson } from '@/lib/api';
import { z } from 'zod';
import { ROUTES } from '@/constants/routes';

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupValues) => {
    try {
      await postJson('api/v1/auth/register', data);
      toast('Account created. Please log in.');
      // router.push(ROUTES.login);
    } catch {
      toast('Sign up failed');
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
          <h2>Create your account ✨</h2>
          <p>Join teams, track progress, and ship faster with a delightful experience.</p>
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
            <h1 className="auth-card__title">Sign up</h1>
            <p className="auth-card__subtitle">It takes less than a minute.</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-grid" noValidate>
            <Input
              label="Full name"
              placeholder="Alex Morgan"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
              {...register('password')}
              error={errors.password?.message}
            />

            <Button type="submit" loading={isSubmitting}>Create account</Button>

            <div className="auth__divider">or</div>

            <div className="auth__socials">
              <button type="button" className="btn">Sign up with Google</button>
              <button type="button" className="btn">Sign up with GitHub</button>
            </div>

            <p className="auth__muted">
              Already have an account?{' '}
              <Link className="auth__link" href={ROUTES.login}>Log in</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
