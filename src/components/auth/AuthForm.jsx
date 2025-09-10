// components/AuthForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AuthForm = ({ type = 'login' }) => {
  const router = useRouter();
  const [authData, setAuthData] = useState({
    identifier: '',
    mode: 'email',
    otp: '',
    firstName: '',
    lastName: '',
    age: '',
    region: ''
  });
  const [step, setStep] = useState(1); // 1: identifier input, 2: OTP input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData(prev => ({ ...prev, [name]: value }));
  };

  const handleModeToggle = () => {
    setAuthData(prev => ({
      ...prev,
      mode: prev.mode === 'email' ? 'mobile' : 'email',
      identifier: ''
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (!authData.identifier) {
      setError(`Please enter your ${authData.mode === 'email' ? 'email address' : 'phone number'}`);
      setLoading(false);
      return;
    }
    
    if (authData.mode === 'email' && !/\S+@\S+\.\S+/.test(authData.identifier)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    if (authData.mode === 'mobile' && !/^[\+]?[1-9][\d]{0,15}$/.test(authData.identifier.replace(/\D/g, ''))) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API here:
      // const endpoint = type === 'login' ? 'login' : 'register';
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...(type === 'register' && {
      //       firstName: authData.firstName,
      //       lastName: authData.lastName,
      //       age: authData.age,
      //       region: authData.region,
      //       [authData.mode === 'email' ? 'email' : 'phone']: authData.identifier
      //     }),
      //     ...(type === 'login' && {
      //       identifier: authData.identifier,
      //       mode: authData.mode
      //     })
      //   }),
      // });
      
      setStep(2);
      setCountdown(30); // 30 seconds countdown
      
      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!authData.otp || authData.otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API here:
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     identifier: authData.identifier,
      //     mode: authData.mode,
      //     otp: authData.otp
      //   }),
      // });
      
      // On success, redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    
    setCountdown(30);
    setError('');
    
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // In a real app, you would call your API here to resend OTP
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for social login functionality
    console.log(`Logging in with ${provider}`);
    setError(`${provider} login will be implemented soon`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 p-4">
      <div className="flex flex-col w-full max-w-md p-8 text-center bg-white rounded-3xl shadow-lg">
        <div className="mb-6">
          <h3 className="mb-2 text-3xl font-extrabold text-gray-900">
            {type === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-gray-600">
            {step === 1 
              ? type === 'login' 
                ? `Enter your ${authData.mode === 'email' ? 'email' : 'phone number'} to continue` 
                : `Start planning your dream wedding`
              : `Enter the OTP sent to your ${authData.mode === 'email' ? 'email' : 'phone'}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}>
          {step === 1 ? (
            <div className="space-y-4">
              {type === 'register' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm text-start text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="First Name"
                      value={authData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-xl outline-none focus:bg-gray-200 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm text-start text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Last Name"
                      value={authData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-xl outline-none focus:bg-gray-200 transition-colors duration-300"
                    />
                  </div>
                </div>
              )}

              {type === 'register' && (
                <>
                  <div>
                    <label htmlFor="age" className="block text-sm text-start text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="100"
                      placeholder="Age"
                      value={authData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-xl outline-none focus:bg-gray-200 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="region" className="block text-sm text-start text-gray-700 mb-1">
                      Region
                    </label>
                    <input
                      id="region"
                      name="region"
                      type="text"
                      placeholder="Region"
                      value={authData.region}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-xl outline-none focus:bg-gray-200 transition-colors duration-300"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {authData.mode === 'email' ? 'Email' : 'Mobile'} Verification
                </span>
                <button
                  type="button"
                  onClick={handleModeToggle}
                  className="text-sm text-rose-600 hover:text-rose-500 transition-colors"
                >
                  Use {authData.mode === 'email' ? 'mobile' : 'email'} instead
                </button>
              </div>

              <div className="relative">
                <input
                  id="identifier"
                  name="identifier"
                  type={authData.mode === 'email' ? 'email' : 'tel'}
                  placeholder={authData.mode === 'email' ? 'email@example.com' : '+1 234 567 8900'}
                  value={authData.identifier}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-gray-900 bg-gray-100 rounded-2xl outline-none focus:bg-gray-200 transition-colors duration-300"
                  required
                />
                {authData.mode === 'email' ? (
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                ) : (
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-white bg-rose-500 rounded-2xl hover:bg-rose-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  type === 'login' ? 'Send OTP' : 'Create Account'
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Enter Verification Code</h3>
                <p className="mt-1 text-sm text-gray-600">
                  We've sent a 6-digit code to your {authData.mode === 'email' ? 'email' : 'phone'}
                </p>
                <p className="text-sm font-medium text-gray-900">{authData.identifier}</p>
              </div>

              <div className="flex justify-center space-x-2 mb-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    value={authData.otp[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d?$/.test(value)) {
                        const newOtp = authData.otp.split('');
                        newOtp[index] = value;
                        setAuthData(prev => ({ ...prev, otp: newOtp.join('') }));
                        
                        // Auto focus to next input
                        if (value && index < 5) {
                          document.getElementById(`otp-${index + 1}`)?.focus();
                        }
                      }
                    }}
                    id={`otp-${index}`}
                  />
                ))}
              </div>

              <div className="text-center mb-4">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={countdown > 0}
                  className={`text-sm ${countdown > 0 ? 'text-gray-500' : 'text-rose-600 hover:text-rose-500'}`}
                >
                  {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || authData.otp.length !== 6}
                className="w-full py-4 text-white bg-rose-500 rounded-2xl hover:bg-rose-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  type === 'login' ? 'Verify & Sign In' : 'Verify & Create Account'
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back
              </button>
            </div>
          )}
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="Google" />
            Google
          </button>
          <button 
            onClick={() => handleSocialLogin('facebook')}
            className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
            Facebook
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          {type === 'login' ? (
            <>
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-rose-600 hover:text-rose-500 transition-colors">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500 transition-colors">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;