import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Check, ChevronDown, Facebook, Github } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import AnimateOnScroll from '../components/ui/AnimateOnScroll';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    receiveCommunication: true,
    preparingFor: '',
    targetYear: '',
    previousAttempts: '0',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const examOptions = [
    { id: 'upsc-cse', name: 'UPSC Civil Services Exam' },
    { id: 'upsc-ese', name: 'UPSC Engineering Services Exam' },
    { id: 'upsc-nda', name: 'UPSC NDA Exam' },
    { id: 'upsc-cds', name: 'UPSC CDS Exam' },
    { id: 'upsc-medical', name: 'UPSC Combined Medical Services' },
  ];

  const yearOptions = ['2025', '2026', '2027', '2028'];
  const attemptOptions = ['0', '1', '2', '3+'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
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

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms of Service';
    }
    
    return errors;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.preparingFor) {
      errors.preparingFor = 'Please select an exam';
    }
    
    if (!formData.targetYear) {
      errors.targetYear = 'Please select a target year';
    }
    
    return errors;
  };

  const handleContinue = () => {
    const errors = validateStep1();
    
    if (Object.keys(errors).length === 0) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      setFormErrors(errors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let errors;
    if (step === 1) {
      errors = validateStep1();
      if (Object.keys(errors).length === 0) {
        setStep(2);
        window.scrollTo(0, 0);
        return;
      }
    } else {
      errors = validateStep2();
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to register the user
      // await registerUser(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      setFormErrors({
        form: 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would redirect to the OAuth provider
      console.log(`Signing up with ${provider}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error(`${provider} signup failed:`, error);
      setFormErrors({
        form: `${provider} signup failed. Please try again.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout userRole="visitor">
      <Head>
        <title>{step === 1 ? 'Create an Account' : 'Complete Your Profile'} | UPSCMONK</title>
      </Head>
      
      <div className="bg-neutral-50 py-12 md:py-20">
        <AnimateOnScroll animation="fadeIn">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-smooth-lg overflow-hidden">
                {/* Progress indicator */}
                <div className="bg-primary-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 1 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'
                      }`}>
                        {step > 1 ? <Check size={16} /> : 1}
                      </div>
                      <span className="font-medium">Account Details</span>
                    </div>
                    
                    <div className="flex-1 mx-4 h-[2px] bg-neutral-200">
                      <div className={`h-full ${step > 1 ? 'bg-primary' : ''}`}></div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 2 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'
                      }`}>
                        2
                      </div>
                      <span className="font-medium">Exam Preferences</span>
                    </div>
                  </div>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 md:p-10">
                  {step === 1 ? (
                    <div className="space-y-8">
                      <div className="text-center">
                        <h1 className="text-3xl font-bold">Create Your Account</h1>
                        <p className="text-neutral-600 mt-2">
                          Join thousands of UPSC aspirants preparing with UPSCMONK
                        </p>
                      </div>
                      
                      {/* Social signup options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => handleSocialSignup('Google')}
                          disabled={isLoading}
                          className="flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-lg shadow-sm bg-white hover:bg-neutral-50 transition-colors"
                        >
                          <img 
                            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" 
                            alt="Google" 
                            className="w-5 h-5 mr-2" 
                          />
                          Continue with Google
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSocialSignup('Facebook')}
                          disabled={isLoading}
                          className="flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-lg shadow-sm bg-white hover:bg-neutral-50 transition-colors"
                        >
                          <Facebook size={20} className="text-[#1877F2] mr-2" />
                          Continue with Facebook
                        </button>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-white px-4 text-sm text-neutral-500">
                            Or continue with email
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User size={18} className="text-neutral-400" />
                            </div>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`form-input pl-10 ${formErrors.name ? 'border-error focus:ring-error focus:border-error' : ''}`}
                              placeholder="John Doe"
                            />
                          </div>
                          {formErrors.name && (
                            <p className="mt-1 text-sm text-error">{formErrors.name}</p>
                          )}
                        </div>
                        
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
                          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                            Password
                          </label>
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
                          {formErrors.password ? (
                            <p className="mt-1 text-sm text-error">{formErrors.password}</p>
                          ) : (
                            <p className="mt-1 text-xs text-neutral-500">
                              Password must be at least 8 characters
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size={18} className="text-neutral-400" />
                            </div>
                            <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className={`form-input pl-10 ${formErrors.confirmPassword ? 'border-error focus:ring-error focus:border-error' : ''}`}
                              placeholder="••••••••"
                            />
                          </div>
                          {formErrors.confirmPassword && (
                            <p className="mt-1 text-sm text-error">{formErrors.confirmPassword}</p>
                          )}
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="agreeTerms"
                              name="agreeTerms"
                              type="checkbox"
                              checked={formData.agreeTerms}
                              onChange={handleChange}
                              className="form-checkbox"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="agreeTerms" className={formErrors.agreeTerms ? "text-error" : "text-neutral-600"}>
                              I agree to the{' '}
                              <Link href="/terms" className="text-primary hover:text-primary-500">
                                Terms of Service
                              </Link>{' '}
                              and{' '}
                              <Link href="/privacy" className="text-primary hover:text-primary-500">
                                Privacy Policy
                              </Link>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="receiveCommunication"
                              name="receiveCommunication"
                              type="checkbox"
                              checked={formData.receiveCommunication}
                              onChange={handleChange}
                              className="form-checkbox"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="receiveCommunication" className="text-neutral-600">
                              Send me updates about UPSC exam notifications and study materials
                            </label>
                          </div>
                        </div>
                        
                        {formErrors.form && (
                          <div className="bg-error-50 text-error p-3 rounded-md text-sm">
                            {formErrors.form}
                          </div>
                        )}
                        
                        <Button
                          type="button"
                          variant="primary"
                          size="lg"
                          fullWidth
                          rightIcon={<ArrowRight size={16} />}
                          isLoading={isLoading}
                          onClick={handleContinue}
                        >
                          Continue
                        </Button>
                        
                        <p className="text-center text-sm text-neutral-600">
                          Already have an account?{' '}
                          <Link href="/login" className="text-primary font-medium hover:text-primary-500">
                            Log in
                          </Link>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="text-center">
                        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
                        <p className="text-neutral-600 mt-2">
                          Tell us about your UPSC journey so we can personalize your experience
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="preparingFor" className="block text-sm font-medium text-neutral-700 mb-1">
                            Which exam are you preparing for?
                          </label>
                          <select
                            id="preparingFor"
                            name="preparingFor"
                            value={formData.preparingFor}
                            onChange={handleChange}
                            className={`form-input ${formErrors.preparingFor ? 'border-error focus:ring-error focus:border-error' : ''}`}
                          >
                            <option value="" disabled>Select an exam</option>
                            {examOptions.map(option => (
                              <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                          </select>
                          {formErrors.preparingFor && (
                            <p className="mt-1 text-sm text-error">{formErrors.preparingFor}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="targetYear" className="block text-sm font-medium text-neutral-700 mb-1">
                              Target year for the exam
                            </label>
                            <select
                              id="targetYear"
                              name="targetYear"
                              value={formData.targetYear}
                              onChange={handleChange}
                              className={`form-input ${formErrors.targetYear ? 'border-error focus:ring-error focus:border-error' : ''}`}
                            >
                              <option value="" disabled>Select year</option>
                              {yearOptions.map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                            {formErrors.targetYear && (
                              <p className="mt-1 text-sm text-error">{formErrors.targetYear}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="previousAttempts" className="block text-sm font-medium text-neutral-700 mb-1">
                              Previous attempts (if any)
                            </label>
                            <select
                              id="previousAttempts"
                              name="previousAttempts"
                              value={formData.previousAttempts}
                              onChange={handleChange}
                              className="form-input"
                            >
                              {attemptOptions.map(attempt => (
                                <option key={attempt} value={attempt}>{attempt}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        {formErrors.form && (
                          <div className="bg-error-50 text-error p-3 rounded-md text-sm">
                            {formErrors.form}
                          </div>
                        )}
                        
                        <div className="flex flex-col-reverse sm:flex-row gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            fullWidth={false}
                            className="flex-1"
                            onClick={() => setStep(1)}
                            disabled={isLoading}
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth={false}
                            className="flex-1"
                            isLoading={isLoading}
                          >
                            Create Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
              
              <div className="mt-8 text-center text-sm text-neutral-500">
                By signing up, you agree to our{' '}
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

export default SignupPage;