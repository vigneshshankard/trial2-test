import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  BookCopy,
  Calendar,
  Award,
  FileText,
  TrendingUp,
  MessageSquare,
  Clock,
  Settings,
  Bell,
  Menu,
  X,
  Search,
  LogOut,
  ChevronDown,
  User,
  Trophy,
} from 'lucide-react';
import GamificationWidget from '../gamification/GamificationWidget';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: 'new' | 'premium';
  current?: boolean;
};

type UserData = {
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [minimizedWidget, setMinimizedWidget] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Get user from localStorage (in a real app, you might get this from a context or Redux)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Redirect to login if no user found
      router.push('/auth/login');
    }
  }, [router]);

  // Define navigation items
  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: router.pathname === '/dashboard' },
    { name: 'Study Planner', href: '/study-planner', icon: Calendar, current: router.pathname.startsWith('/study-planner') },
    { name: 'Current Affairs', href: '/current-affairs', icon: Clock, current: router.pathname.startsWith('/current-affairs') },
    { name: 'Study Materials', href: '/study-materials', icon: BookOpen, current: router.pathname.startsWith('/study-materials') },
    { name: 'Mock Tests', href: '/exams', icon: FileText, current: router.pathname.startsWith('/exams'), badge: 'premium' },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp, current: router.pathname.startsWith('/analytics') },
    { name: 'Community', href: '/community', icon: MessageSquare, current: router.pathname.startsWith('/community') },
    { name: 'Achievements', href: '/achievements', icon: Award, current: router.pathname.startsWith('/achievements'), badge: 'new' },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy, current: router.pathname.startsWith('/leaderboard'), badge: 'new' },
  ];

  // Secondary navigation
  const secondaryNavigation = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help Center', href: '/help', icon: BookCopy },
  ];

  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem('user');
    // Redirect to login
    router.push('/auth/login');
  };

  // Mock notifications for demo purposes
  const notifications = [
    {
      id: 1,
      title: 'New Mock Test Available',
      message: 'UPSC Prelims Mock Test Series 2025 is now available.',
      time: '1h ago',
      read: false,
    },
    {
      id: 2,
      title: 'Study Reminder',
      message: 'You have a scheduled study session in 30 minutes.',
      time: '2h ago',
      read: false,
    },
    {
      id: 3,
      title: 'Achievement Unlocked',
      message: 'You earned the "5-Day Streak" badge!',
      time: '1d ago',
      read: true,
    },
    {
      id: 4,
      title: 'UPSC Notification',
      message: 'UPSC has released the new exam calendar for 2025-26.',
      time: '2d ago',
      read: true,
    },
  ];

  if (!user) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-neutral-50">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />
            
            <motion.div
              initial={{ translateX: -280 }}
              animate={{ translateX: 0 }}
              exit={{ translateX: -280 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className="fixed inset-y-0 flex flex-col z-40 w-64 max-w-xs"
            >
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto bg-white">
                <div className="flex items-center justify-between px-4">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img className="h-8 w-auto" src="/logo.png" alt="UPSCMONK" />
                  </div>
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-200"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <X className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                          item.current 
                            ? 'bg-neutral-100 text-primary' 
                            : 'text-neutral-700 hover:text-primary hover:bg-neutral-50'
                        }
                      `}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          item.current ? 'text-primary' : 'text-neutral-500 group-hover:text-primary'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                      {item.badge && (
                        <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.badge === 'new' ? 'bg-green-100 text-green-800' : 'bg-primary-100 text-primary-800'
                        }`}>
                          {item.badge.charAt(0).toUpperCase() + item.badge.slice(1)}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
                <div className="flex items-center">
                  <div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-sm text-red-600 group hover:text-red-700"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-neutral-100">
            <div className="flex items-center h-16 flex-shrink-0 px-4">
              <img className="h-8 w-auto" src="/logo.png" alt="UPSCMONK" />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto pt-3 pb-4">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                        item.current 
                          ? 'bg-neutral-100 text-primary' 
                          : 'text-neutral-700 hover:text-primary hover:bg-neutral-50'
                      }
                    `}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        item.current ? 'text-primary' : 'text-neutral-500 group-hover:text-primary'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.badge && (
                      <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.badge === 'new' ? 'bg-green-100 text-green-800' : 'bg-primary-100 text-primary-800'
                      }`}>
                        {item.badge.charAt(0).toUpperCase() + item.badge.slice(1)}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 px-2 space-y-1">
                <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Support
                </h3>
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                        router.pathname === item.href
                          ? 'bg-neutral-100 text-neutral-900'
                          : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                      }
                    `}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        router.pathname === item.href
                          ? 'text-neutral-700'
                          : 'text-neutral-400 group-hover:text-neutral-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
              <div className="flex items-center">
                <div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-sm text-red-600 group hover:text-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-neutral-200">
          <button
            className="md:hidden px-4 border-r border-neutral-200 text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <button
                className="w-full text-neutral-400 focus:outline-none flex items-center px-4 py-2 text-sm leading-5 text-neutral-700 hover:bg-neutral-50 focus:bg-neutral-50 rounded-md mr-4"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="mr-2 h-5 w-5" />
                <span>Search everything...</span>
                <span className="ml-auto text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
                  ⌘K
                </span>
              </button>
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              {/* Notification dropdown */}
              <div className="relative">
                <button
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-3 relative"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2 px-3 border-b border-neutral-100">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-neutral-800">Notifications</h3>
                        <button className="text-xs text-primary hover:text-primary-500">Mark all as read</button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="divide-y divide-neutral-100">
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={`px-3 py-2 hover:bg-neutral-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-neutral-900">
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-neutral-500 mt-0.5">
                                    {notification.time}
                                  </p>
                                  <p className="text-sm text-neutral-600 mt-1">
                                    {notification.message}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className="ml-3 flex-shrink-0">
                                    <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 px-3 text-center text-sm text-neutral-500">
                          No notifications
                        </div>
                      )}
                    </div>
                    <div className="py-2 px-3 border-t border-neutral-100">
                      <Link 
                        href="/notifications" 
                        className="block text-center text-sm text-primary hover:text-primary-500"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="relative">
                <div>
                  <button
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    id="user-menu-button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    {user.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className="hidden md:flex md:items-center ml-2">
                      <span className="text-sm font-medium text-neutral-700 mr-1">{user.name}</span>
                      <ChevronDown className="h-4 w-4 text-neutral-400" />
                    </span>
                  </button>
                </div>

                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
      
      {/* Global Gamification Widget */}
      <GamificationWidget userId={user?.email || ''} isMinimized={minimizedWidget} />
      
      {/* Search modal */}
      {searchOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-start justify-center min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSearchOpen(false)}></div>
            <div className="relative bg-white rounded-lg shadow-xl overflow-hidden max-w-xl w-full">
              <div className="px-4 py-3 border-b border-neutral-100 flex items-center">
                <Search className="h-5 w-5 text-neutral-400 mr-3" />
                <input
                  className="flex-1 border-0 focus:ring-0 focus:outline-none text-base p-0"
                  placeholder="Search..."
                  autoFocus
                />
                <button
                  className="ml-2 text-neutral-400 hover:text-neutral-500"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="text-center py-8 text-sm text-neutral-500">
                  Start typing to search...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;