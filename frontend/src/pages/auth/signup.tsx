import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
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

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      // In a real app, this would be an API call to register the user
      // For demo purposes, simulate a successful registration after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRegistrationSuccess(true);
      setTimeout(() => {
        router.push('/auth/login?registered=true');
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      setFormErrors({ 
        submit: 'An error occurred during registration. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would redirect to OAuth provider
    console.log(`Logging in with ${provider}`);
    // For demo purposes, simulate loading
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dashboard');
    }, 1500);
  };

  if (registrationSuccess) {
    return (
      <Layout userRole="visitor">
        <Head>
          <title>Registration Successful | UPSCMONK</title>
        </Head>
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold">Registration Successful!</h2>
              <p className="mt-2 text-neutral-600">
                Your account has been created successfully. Redirecting you to login...
              </p>
              <div className="mt-8">
                <div className="animate-pulse flex justify-center">
                  <div className="h-2 w-24 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout userRole="visitor">
      <Head>
        <title>Sign Up | UPSCMONK</title>
      </Head>
      <div className="min-h-[80vh] flex flex-col md:flex-row py-12">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-center">Create Your Account</h2>
              <p className="mt-2 text-center text-neutral-600">
                Join thousands of UPSC aspirants on their journey to success
              </p>
            </div>
            
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
                    <span className="sr-only">Sign up with {provider.name}</span>
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
                    Or sign up with email
                  </span>
                </div>
              </div>
              
              {/* Email Registration Form */}
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {formErrors.submit && (
                  <div className="bg-error-50 p-3 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-error mr-2 mt-0.5" />
                    <span className="text-error">{formErrors.submit}</span>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700">
                      Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                      </div>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`form-input py-3 pl-10 ${
                          formErrors.fullName ? 'border-error focus:ring-error focus:border-error' : ''
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {formErrors.fullName && (
                      <p className="mt-1 text-sm text-error">{formErrors.fullName}</p>
                    )}
                  </div>
                  
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
                    <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
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
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700">
                      Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`form-input py-3 pl-10 ${
                          formErrors.confirmPassword ? 'border-error focus:ring-error focus:border-error' : ''
                        }`}
                        placeholder="********"
                      />
                    </div>
                    {formErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-error">{formErrors.confirmPassword}</p>
                    )}
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
                        <span className="ml-2">Creating account...</span>
                      </div>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </Button>
                </div>
              </form>
              
              <p className="mt-2 text-sm text-center text-neutral-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-medium text-primary hover:text-primary-500">
                  Sign in
                </Link>
              </p>
              
              <p className="text-xs text-center text-neutral-500">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-primary hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:text-primary-500">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Side Banner */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-800 items-center justify-center p-12">
          <div className="max-w-md">
            <AnimateOnScroll animation="fadeIn">
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-4">Begin Your UPSC Journey Today</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <p>Access to comprehensive study materials and mock tests</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <p>Daily current affairs updates curated for UPSC syllabus</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <p>AI-powered personalized study plans and analytics</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <p>Join a community of serious aspirants and toppers</p>
                  </li>
                </ul>
                
                <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="text-lg font-medium text-white">
                    "UPSCMONK's structured approach and comprehensive materials played a crucial role in my success."
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold">RK</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">Rahul Kumar</p>
                      <p className="text-white/70 text-sm">IAS Officer, AIR 42 (2024)</p>
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

export default SignUpPage;