// app/login/page.jsx
import AuthForm from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Login | Wedding Planner',
  description: 'Login to your wedding planner account',
};

export default function LoginPage() {
  return <AuthForm type="login" />;
}