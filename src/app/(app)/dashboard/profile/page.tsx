'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { sendVerificationOtp, verifyContact } from '@/lib/api';

export default function ProfilePage() {
  const { user } = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState<'email' | 'phone' | null>(null);
  const [otp, setOtp] = useState('');

  const handleSendVerificationOtp = async (type: 'email' | 'phone') => {
    setIsLoading(true);

    try {
      const response = await sendVerificationOtp(type, localStorage.getItem('token')!);
      if (response.success) {
        setShowOtpField(type);
        toast.success(response.message);
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyContact = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = showOtpField === 'email' 
        ? { email: user?.email, otp }
        : { phone: user?.phone, otp };

      const response = await verifyContact(payload, localStorage.getItem('token')!);
      if (response.success) {
        toast.success(response.message);
        setShowOtpField(null);
        setOtp('');
      } else {
        toast.error(response.message || 'Verification failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user?.name || 'Not set'}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center gap-4">
                    <span>{user?.email || 'Not set'}</span>
                    {user?.email && !user?.isEmailVerified && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSendVerificationOtp('email')}
                        loading={isLoading && showOtpField === 'email'}
                      >
                        Verify Email
                      </Button>
                    )}
                    {user?.isEmailVerified && (
                      <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        Verified
                      </span>
                    )}
                  </div>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Phone number</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center gap-4">
                    <span>{user?.phone || 'Not set'}</span>
                    {user?.phone && !user?.isPhoneVerified && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSendVerificationOtp('phone')}
                        loading={isLoading && showOtpField === 'phone'}
                      >
                        Verify Phone
                      </Button>
                    )}
                    {user?.isPhoneVerified && (
                      <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        Verified
                      </span>
                    )}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {showOtpField && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Verify your {showOtpField === 'email' ? 'email' : 'phone'}
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Enter the verification code sent to your {showOtpField === 'email' ? 'email' : 'phone'}.</p>
            </div>
            <form className="mt-5" onSubmit={handleVerifyContact}>
              <div className="flex gap-4">
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  placeholder="Enter verification code"
                  className="w-48"
                />
                <Button type="submit" loading={isLoading}>
                  Verify
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowOtpField(null);
                    setOtp('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
