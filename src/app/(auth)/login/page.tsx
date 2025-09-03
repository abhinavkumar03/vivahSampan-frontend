'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { loginSchema } from '@/features/auth/server/schemas';
import { toast } from '@/hooks/use-toast';
import { postJson } from '@/lib/api';
import { z } from 'zod';

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginValues) => {
    try {
      // Spring Boot endpoint (to build later)
      const res = await postJson<{ token?: string; userId: string }>('api/v1/auth/login', data);
      // TODO: store token or rely on HttpOnly cookie set by backend
      toast('Logged in!');
      // router.push('/(app)'); // enable when you create protected area
    } catch (e) {
      toast('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Button type="submit" loading={isSubmitting}>Login</Button>
      </form>
    </div>
  );
}
