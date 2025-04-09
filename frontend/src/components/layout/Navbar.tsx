import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../ui/Button';
import { 
  Menu, 
  X, 
  ChevronDown,
  User,
  Bell,
  Book,
  Calendar,
  Trophy,
  Users,
  Settings,
  LogOut,
  Crown 
} from 'lucide-react';

// In a real application, this would come from an authentication context
// This is a placeholder for demonstration
type UserRole = 'visitor' | 'free' | 'premium' | 'admin';

interface NavbarProps {
  userRole?: UserRole;
}

const Navbar: React.FC<NavbarProps> = ({ userRole = 'visitor' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Navigation items based on user role
  const navItems = {
    visitor: [
      { label: 'Home', href: '/' },
      { label: 'Study Materials', href: '/study-materials' },
      { label: 'Current Affairs', href: '/current-affairs' },
      { label: 'Mock Tests', href: '/mock-tests' },
    ],
    free: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Study Materials', href: '/study-materials' },
      { label: 'Current Affairs', href: '/current-affairs' },
      { label: 'Mock Tests', href: '/mock-tests' },
      { label: 'Study Planner', href: '/study-planner' },
      { label: 'Community', href: '/community' },
    ],
    premium: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Study Materials', href: '/study-materials' },
      { label: 'Current Affairs', href: '/current-affairs' },
      { label: 'Mock Tests', href: '/mock-tests' },
      { label: 'Study Planner', href: '/study-planner' },
      { label: 'Community', href: '/community' },
      { label: 'Premium Content', href: '/premium' },
      { label: 'Mentorship', href: '/mentors' },
    ],
    admin: [
      { label: 'Dashboard', href: '/admin' },
      { label: 'Content Management', href: '/admin/content' },
      { label: 'User Management', href: '/admin/users' },
      { label: 'Analytics', href: '/admin/analytics' },
      { label: 'Notifications', href: '/admin/notifications' },
      { label: 'Settings', href: '/admin/settings' },
    ],
  };

  // User profile menu items
  const profileMenuItems = {
    free: [
      { label: 'My Profile', href: '/profile', icon: <User size={16} /> },
      { label: 'Notifications', href: '/notifications', icon: <Bell size={16} /> },
      { label: 'My Progress', href: '/progress', icon: <Trophy size={16} /> },
      { label: 'Settings', href: '/settings', icon: <Settings size={16} /> },
      { label: 'Upgrade to Premium', href: '/upgrade', icon: <Crown size={16} /> },
      { label: 'Logout', href: '/logout', icon: <LogOut size={16} /> },
    ],
    premium: [
      { label: 'My Profile', href: '/profile', icon: <User size={16} /> },
      { label: 'Notifications', href: '/notifications', icon: <Bell size={16} /> },
      { label: 'My Progress', href: '/progress', icon: <Trophy size={16} /> },
      { label: 'Settings', href: '/settings', icon: <Settings size={16} /> },
      { label: 'Manage Subscription', href: '/subscription', icon: <Crown size={16} /> },
      { label: 'Logout', href: '/logout', icon: <LogOut size={16} /> },
    ],
    admin: [
      { label: 'Admin Panel', href: '/admin', icon: <Settings size={16} /> },
      { label: 'My Profile', href: '/profile', icon: <User size={16} /> },
      { label: 'Notifications', href: '/notifications', icon: <Bell size={16} /> },
      { label: 'Logout', href: '/logout', icon: <LogOut size={16} /> },
    ],
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>
              UPSCMONK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems[userRole].map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`${
                  isScrolled ? 'text-neutral-700 hover:text-primary' : 'text-white hover:text-accent-100'
                } font-medium transition-colors ${
                  router.pathname === item.href ? 'border-b-2 border-accent' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Authentication/Profile buttons */}
            {userRole === 'visitor' ? (
              <div className="flex items-center space-x-2 ml-6">
                <Button 
                  variant="ghost"
                  className={`${isScrolled ? 'text-primary' : 'text-white'}`}
                  onClick={() => router.push('/login')}
                >
                  Log In
                </Button>
                <Button 
                  variant={isScrolled ? "primary" : "accent"}
                  onClick={() => router.push('/register')}
                >
                  Register
                </Button>
              </div>
            ) : (
              <div className="relative ml-6">
                <Button 
                  variant="ghost"
                  className={`flex items-center ${isScrolled ? 'text-primary' : 'text-white'}`}
                  onClick={toggleProfileMenu}
                >
                  <User size={20} className="mr-1" />
                  <span className="mx-1">Account</span>
                  <ChevronDown size={16} />
                </Button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="py-2">
                      {userRole === 'premium' && (
                        <div className="px-4 py-2 text-sm text-accent-700 bg-accent-50 flex items-center">
                          <Crown size={14} className="mr-2" />
                          <span>Premium Member</span>
                        </div>
                      )}
                      {profileMenuItems[userRole === 'visitor' ? 'free' : userRole].map((item, index) => (
                        <Link 
                          key={index} 
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={closeMenu}
                        >
                          {item.icon}
                          <span className="ml-2">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className={`md:hidden ${isScrolled ? 'text-primary' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} className={isOpen ? 'hidden' : 'block'} />
            <X size={24} className={isOpen ? 'block' : 'hidden'} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-b-lg shadow-lg mt-2 py-4 px-4 absolute left-0 right-0">
            {navItems[userRole].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 text-neutral-700 hover:text-primary ${
                  router.pathname === item.href ? 'font-semibold text-primary' : ''
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            {userRole === 'visitor' ? (
              <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col space-y-2">
                <Button 
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    router.push('/login');
                    closeMenu();
                  }}
                >
                  Log In
                </Button>
                <Button 
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    router.push('/register');
                    closeMenu();
                  }}
                >
                  Register
                </Button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <p className="font-medium text-sm text-neutral-500 mb-2">Account</p>
                {profileMenuItems[userRole === 'visitor' ? 'free' : userRole].map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.href}
                    className="flex items-center py-2 text-neutral-700 hover:text-primary"
                    onClick={closeMenu}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;