// app/signup/page.jsx
import AuthForm from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Sign Up | Wedding Planner',
  description: 'Create your wedding planner account',
};

export default function SignupPage() {
  return <AuthForm type="register" />;
}