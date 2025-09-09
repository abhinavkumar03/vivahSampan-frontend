// components/AuthForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
  const [step, setStep] = useState(type === 'login' ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeForm, setActiveForm] = useState(type);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (activeForm !== type) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setActiveForm(type);
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [type, activeForm]);

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
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${type === 'login' ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(type === 'register' && {
            firstName: authData.firstName,
            lastName: authData.lastName,
            age: authData.age,
            region: authData.region,
            [authData.mode === 'email' ? 'email' : 'phone']: authData.identifier
          }),
          ...(type === 'login' && {
            identifier: authData.identifier,
            mode: authData.mode
          })
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message?.includes('OTP sent')) {
          setStep(1);
          setSuccess('OTP sent successfully!');
        } else {
          throw new Error(data.message || 'Something went wrong');
        }
      } else {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
          router.push('/dashboard');
        } else {
          setStep(1);
          setSuccess('OTP sent successfully!');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: authData.identifier,
          mode: authData.mode,
          otp: authData.otp
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for social login functionality
    console.log(`Logging in with ${provider}`);
    setError(`${provider} login will be implemented soon`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-rose-50 to-rose-100">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-lg">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              {activeForm === 'login' ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {activeForm === 'login' ? 'Sign in to continue planning your special day' : 'Join us to start planning your dream wedding'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                </button>
              </div>

              <div>
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>

              <div>
                <button
                  onClick={() => handleSocialLogin('apple')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                >
                  <span className="sr-only">Sign in with Apple</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md animate-pulse">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
              {success}
            </div>
          )}

          <form className="mt-6 space-y-6" onSubmit={step === 0 ? handleSendOtp : handleVerifyOtp}>
            <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {step === 0 && activeForm === 'register' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm transition-colors duration-300"
                        placeholder="First Name"
                        value={authData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm transition-colors duration-300"
                        placeholder="Last Name"
                        value={authData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="100"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm transition-colors duration-300"
                      placeholder="Age"
                      value={authData.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Region
                    </label>
                    <input
                      id="region"
                      name="region"
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm transition-colors duration-300"
                      placeholder="Region"
                      value={authData.region}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {step === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {authData.mode === 'email' ? 'Email' : 'Mobile'} Verification
                    </span>
                    <button
                      type="button"
                      onClick={handleModeToggle}
                      className="text-sm text-rose-600 hover:text-rose-500 transition-colors duration-300"
                    >
                      Use {authData.mode === 'email' ? 'mobile' : 'email'} instead
                    </button>
                  </div>

                  <div>
                    <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                      {authData.mode === 'email' ? 'Email address' : 'Phone number'}
                    </label>
                    <input
                      id="identifier"
                      name="identifier"
                      type={authData.mode === 'email' ? 'email' : 'tel'}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm transition-colors duration-300"
                      placeholder={authData.mode === 'email' ? 'email@example.com' : '+1234567890'}
                      value={authData.identifier}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Verification Required</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Enter the verification code sent to your {authData.mode === 'email' ? 'email' : 'phone'}
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                      Verification Code
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      className="mt-1 block w-full text-center text-xl tracking-widest rounded-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm transition-colors duration-300"
                      placeholder="XXXXXX"
                      value={authData.otp}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-sm text-rose-600 hover:text-rose-500 transition-colors duration-300"
                    >
                      Resend code
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-rose-500 to-rose-600 py-3 px-4 text-sm font-medium text-white hover:from-rose-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : step === 0 ? (
                  <span>{activeForm === 'login' ? 'Send OTP' : 'Continue'}</span>
                ) : (
                  <span>Verify & {activeForm === 'login' ? 'Sign In' : 'Sign Up'}</span>
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {activeForm === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <Link href="/signup" className="font-medium text-rose-600 hover:text-rose-500 transition-colors duration-300">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500 transition-colors duration-300">
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Decorative Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100 to-rose-200 opacity-90"></div>
        <Image
          src="/wedding-auth-bg.jpg"
          alt="Wedding background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white z-10 max-w-md">
            <h1 className="text-4xl font-bold mb-6">Your Dream Wedding Starts Here</h1>
            <p className="text-xl mb-8">
              Find the perfect vendors, plan your special day, and create memories that last a lifetime.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
                <p className="text-sm">Venues</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">Photographers</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <p className="text-sm">Catering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;