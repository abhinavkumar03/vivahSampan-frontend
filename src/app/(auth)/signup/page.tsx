'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { signupSchema } from '@/features/auth/server/schemas';
import { toast } from '@/hooks/use-toast';
import { postJson } from '@/lib/api';
import { z } from 'zod';

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupValues) => {
    try {
      await postJson('api/v1/auth/register', data);
      toast('Account created. Please log in.');
      // router.push('/(auth)/login');
    } catch {
      toast('Sign up failed');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input label="Name" {...register('name')} error={errors.name?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Button type="submit" loading={isSubmitting}>Create account</Button>
      </form>
    </div>
  );
}
