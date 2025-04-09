import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import AnimateOnScroll from '../../components/ui/AnimateOnScroll';

// In a real app, these would be actual OAuth providers' details and APIs
const socialProviders = [
  { 
    name: 'Google', 
    color: 'bg-white hover:bg-gray-50', 
    textColor: 'text-gray-700', 
    icon: '/icons/google.svg' 
  },
  { 
    name: 'Facebook', 
    color: 'bg-blue-600 hover:bg-blue-700', 
    textColor: 'text-white', 
    icon: '/icons/facebook.svg' 
  },
  { 
    name: 'Apple', 
    color: 'bg-black hover:bg-gray-900', 
    textColor: 'text-white', 
    icon: '/icons/apple.svg' 
  },
];

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { registered } = router.query;
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (registered === 'true') {
      setShowRegistrationSuccess(true);
      
      // Hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowRegistrationSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [registered]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData({ ...formData, [name]: inputValue });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to authenticate the user
      // For demo purposes, simulate a successful login after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage or sessionStorage based on rememberMe
      const userData = {
        name: 'John Doe', // This would come from the API response
        email: formData.email,
        role: 'student',
      };
      
      if (formData.rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
      
      // Redirect to dashboard
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      setFormErrors({ 
        submit: 'Invalid email or password. Please try again.' 
      });
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would redirect to OAuth provider
    console.log(`Logging in with ${provider}`);
    // For demo purposes, simulate loading and success
    setIsSubmitting(true);
    setTimeout(() => {
      const userData = {
        name: 'Jane Smith', // Mock data
        email: 'jane.smith@example.com',
        role: 'student',
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      setIsSubmitting(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <Layout userRole="visitor">
      <Head>
        <title>Login | UPSCMONK</title>
      </Head>
      <div className="min-h-[80vh] flex flex-col md:flex-row py-12">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
              <p className="mt-2 text-center text-neutral-600">
                Continue your UPSC preparation journey
              </p>
            </div>
            
            {showRegistrationSuccess && (
              <div className="bg-success-50 p-4 rounded-md flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5" />
                <div>
                  <span className="font-medium text-success">Registration successful!</span>
                  <p className="text-success-700 text-sm mt-1">Your account has been created. You can now log in.</p>
                </div>
              </div>
            )}
            
            <div className="mt-8 space-y-6">
              {/* Social Login Options */}
              <div className="space-y-3">
                {socialProviders.map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => handleSocialLogin(provider.name)}
                    disabled={isSubmitting}
                    className={`relative w-full flex items-center justify-center py-3 px-4 border border-neutral-300 rounded-md shadow-sm ${provider.color} ${provider.textColor} font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors`}
                  >
                    <span className="sr-only">Sign in with {provider.name}</span>
                    <span className="absolute left-4 flex items-center justify-center">
                      <img 
                        src={provider.icon} 
                        alt={`${provider.name} logo`} 
                        className="w-5 h-5"
                        onError={(e) => {
                          // Fallback if image doesn't load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </span>
                    Continue with {provider.name}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-neutral-500">
                    Or sign in with email
                  </span>
                </div>
              </div>
              
              {/* Email Login Form */}
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {formErrors.submit && (
                  <div className="bg-error-50 p-3 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-error mr-2 mt-0.5" />
                    <span className="text-error">{formErrors.submit}</span>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                      Email address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input py-3 pl-10 ${
                          formErrors.email ? 'border-error focus:ring-error focus:border-error' : ''
                        }`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-error">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                        Password
                      </label>
                      <Link 
                        href="/auth/forgot-password"
                        className="text-sm font-medium text-primary hover:text-primary-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`form-input py-3 pl-10 ${
                          formErrors.password ? 'border-error focus:ring-error focus:border-error' : ''
                        }`}
                        placeholder="********"
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
                      onChange={handleInputChange}
                      className="form-checkbox"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-neutral-700">
                      Remember me
                    </label>
                  </div>
                </div>
                
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    disabled={isSubmitting}
                    className="relative"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-2">Signing in...</span>
                      </div>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </Button>
                </div>
              </form>
              
              <p className="mt-2 text-sm text-center text-neutral-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="font-medium text-primary hover:text-primary-500">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Side Banner */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-secondary-600 to-secondary-800 items-center justify-center p-12">
          <div className="max-w-md">
            <AnimateOnScroll animation="fadeIn">
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-4">Continue Your UPSC Journey</h3>
                <p className="mb-6">
                  Access your personalized study plan, track your progress, and stay updated with the latest current affairs tailored for UPSC preparation.
                </p>
                
                <div className="mt-8 space-y-6">
                  {/* Feature highlight */}
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h4 className="text-xl font-bold mb-2">Today's Focus Areas</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-sm font-bold">1</span>
                        </span>
                        <span>Indian Economy: Balance of Payments</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-sm font-bold">2</span>
                        </span>
                        <span>Modern History: National Movement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-sm font-bold">3</span>
                        </span>
                        <span>Environment: COP26 & Climate Commitments</span>
                      </li>
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-white/70">Mock Test</div>
                          <div className="font-medium">UPSC Prelims 2024 Series 3</div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-white/20 rounded-full">
                          Available Today
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;