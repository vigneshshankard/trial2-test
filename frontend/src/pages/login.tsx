import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, Lock, Facebook } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import AnimateOnScroll from '../components/ui/AnimateOnScroll';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is being edited
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to login
      // const response = await loginUser(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user token in localStorage or cookies
      localStorage.setItem('userToken', 'sample-jwt-token');
      localStorage.setItem('userName', 'John Doe'); // We'd get this from the API response
      
      // Redirect to dashboard
      const redirectPath = router.query.redirect as string || '/dashboard';
      router.push(redirectPath);
    } catch (error) {
      console.error('Login failed:', error);
      setFormErrors({
        form: 'Invalid email or password. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would redirect to the OAuth provider
      console.log(`Logging in with ${provider}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user info
      localStorage.setItem('userToken', 'sample-oauth-token');
      localStorage.setItem('userName', 'John Doe'); // We'd get this from the OAuth response
      
      // Redirect to dashboard
      const redirectPath = router.query.redirect as string || '/dashboard';
      router.push(redirectPath);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      setFormErrors({
        form: `${provider} login failed. Please try again.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout userRole="visitor">
      <Head>
        <title>Login | UPSCMONK</title>
      </Head>
      
      <div className="bg-neutral-50 py-12 md:py-20">
        <AnimateOnScroll animation="fadeIn">
          <div className="container">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl shadow-smooth-lg overflow-hidden">                
                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 md:p-10">
                  <div className="space-y-8">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold">Welcome Back</h1>
                      <p className="text-neutral-600 mt-2">
                        Login to continue your UPSC preparation
                      </p>
                    </div>
                    
                    {/* Social login options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('Google')}
                        disabled={isLoading}
                        className="flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-lg shadow-sm bg-white hover:bg-neutral-50 transition-colors"
                      >
                        <img 
                          src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" 
                          alt="Google" 
                          className="w-5 h-5 mr-2" 
                        />
                        Login with Google
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('Facebook')}
                        disabled={isLoading}
                        className="flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-lg shadow-sm bg-white hover:bg-neutral-50 transition-colors"
                      >
                        <Facebook size={20} className="text-[#1877F2] mr-2" />
                        Login with Facebook
                      </button>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-200"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-4 text-sm text-neutral-500">
                          Or login with email
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-neutral-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input pl-10 ${formErrors.email ? 'border-error focus:ring-error focus:border-error' : ''}`}
                            placeholder="you@example.com"
                          />
                        </div>
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-error">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                            Password
                          </label>
                          <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-500">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-neutral-400" />
                          </div>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input pl-10 ${formErrors.password ? 'border-error focus:ring-error focus:border-error' : ''}`}
                            placeholder="••••••••"
                          />
                        </div>
                        {formErrors.password && (
                          <p className="mt-1 text-sm text-error">{formErrors.password}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="rememberMe"
                          name="rememberMe"
                          type="checkbox"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="form-checkbox"
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-neutral-600">
                          Remember me
                        </label>
                      </div>
                      
                      {formErrors.form && (
                        <div className="bg-error-50 text-error p-3 rounded-md text-sm">
                          {formErrors.form}
                        </div>
                      )}
                      
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={isLoading}
                      >
                        Log in
                      </Button>
                      
                      <p className="text-center text-sm text-neutral-600">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-primary font-medium hover:text-primary-500">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="mt-8 text-center text-sm text-neutral-500">
                By logging in, you agree to our{' '}
                <Link href="/terms" className="text-neutral-700 hover:text-primary">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-neutral-700 hover:text-primary">
                  Privacy Policy
                </Link>.
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </Layout>
  );
};

export default LoginPage;