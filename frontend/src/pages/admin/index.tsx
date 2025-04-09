import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Dashboard layout could be reused from other parts of the app
const AdminDashboard = () => {
  const router = useRouter();
  const [activeStat, setActiveStat] = useState('users');

  // Mock data for dashboard
  const stats = {
    users: {
      total: 5823,
      premium: 2341,
      growth: '+12%',
      color: 'bg-blue-500',
    },
    content: {
      total: 1245,
      newToday: 18,
      growth: '+8%',
      color: 'bg-green-500',
    },
    exams: {
      total: 342,
      taken: 12567,
      growth: '+15%',
      color: 'bg-indigo-500',
    },
    revenue: {
      total: '$42,987',
      mrr: '$8,754',
      growth: '+7%',
      color: 'bg-purple-500',
    },
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | UPSCMONK</title>
        <meta name="description" content="Admin dashboard for UPSCMONK platform" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Admin Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-bold text-gray-900">UPSCMONK Admin</h1>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <span className="h-2 w-2 mr-1 rounded-full bg-green-600"></span>
                  Online
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Admin Navigation */}
            <div className="mb-8 border-b border-gray-200">
              <nav className="flex -mb-px">
                <Link href="/admin" legacyBehavior>
                  <a className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8">
                    Overview
                  </a>
                </Link>

                <Link href="/admin/content-management" legacyBehavior>
                  <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8">
                    Content Management
                  </a>
                </Link>

                <Link href="/admin/user-management" legacyBehavior>
                  <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8">
                    User Management
                  </a>
                </Link>

                <Link href="/admin/analytics" legacyBehavior>
                  <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                    Analytics
                  </a>
                </Link>
              </nav>
            </div>

            {/* Dashboard Content */}
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Users Stat */}
                <div 
                  className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all ${activeStat === 'users' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setActiveStat('users')}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md p-3 bg-blue-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stats.users.total}</div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              {stats.users.growth}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-500">Premium Users</div>
                      <div className="text-lg font-semibold text-gray-900">{stats.users.premium}</div>
                    </div>
                  </div>
                </div>

                {/* Content Stat */}
                <div 
                  className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all ${activeStat === 'content' ? 'ring-2 ring-green-500' : ''}`}
                  onClick={() => setActiveStat('content')}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md p-3 bg-green-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Content</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stats.content.total}</div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              {stats.content.growth}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-500">New Today</div>
                      <div className="text-lg font-semibold text-gray-900">{stats.content.newToday}</div>
                    </div>
                  </div>
                </div>

                {/* Exams Stat */}
                <div 
                  className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all ${activeStat === 'exams' ? 'ring-2 ring-indigo-500' : ''}`}
                  onClick={() => setActiveStat('exams')}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md p-3 bg-indigo-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Exams</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stats.exams.total}</div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              {stats.exams.growth}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-500">Exams Taken</div>
                      <div className="text-lg font-semibold text-gray-900">{stats.exams.taken}</div>
                    </div>
                  </div>
                </div>

                {/* Revenue Stat */}
                <div 
                  className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all ${activeStat === 'revenue' ? 'ring-2 ring-purple-500' : ''}`}
                  onClick={() => setActiveStat('revenue')}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md p-3 bg-purple-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stats.revenue.total}</div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              {stats.revenue.growth}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-500">MRR</div>
                      <div className="text-lg font-semibold text-gray-900">{stats.revenue.mrr}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {[
                      { action: 'New user registered', user: 'Rahul Sharma', time: '10 minutes ago' },
                      { action: 'Current Affairs content updated', user: 'Admin Priya', time: '1 hour ago' },
                      { action: 'New mock test uploaded', user: 'Admin Vikram', time: '3 hours ago' },
                      { action: 'Subscription purchased', user: 'Neha Patel', time: '5 hours ago' },
                      { action: 'Feedback submitted', user: 'Arjun Singh', time: '1 day ago' },
                    ].map((activity, idx) => (
                      <li key={idx}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">{activity.action}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                {activity.user}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <button
                    onClick={() => router.push('/admin/content-management/create')}
                    className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-900">Add New Content</span>
                  </button>

                  <button
                    onClick={() => router.push('/admin/user-management')}
                    className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-900">Manage Users</span>
                  </button>

                  <button
                    onClick={() => router.push('/admin/analytics')}
                    className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-900">View Analytics</span>
                  </button>

                  <button
                    onClick={() => router.push('/admin/notifications/create')}
                    className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-900">Send Notifications</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;