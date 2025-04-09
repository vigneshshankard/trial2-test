import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// User Management component for admin dashboard
const UserManagement = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - would be replaced with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        {
          id: '1',
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          registeredDate: '2023-01-15',
          premiumStatus: true,
          lastLogin: '2023-04-08T10:30:00',
          accountStatus: 'active'
        },
        {
          id: '2',
          name: 'Priya Patel',
          email: 'priya.patel@example.com',
          registeredDate: '2023-02-21',
          premiumStatus: false,
          lastLogin: '2023-04-07T14:45:00',
          accountStatus: 'active'
        },
        {
          id: '3',
          name: 'Amit Kumar',
          email: 'amit.kumar@example.com',
          registeredDate: '2023-03-05',
          premiumStatus: true,
          lastLogin: '2023-04-08T09:15:00',
          accountStatus: 'active'
        },
        {
          id: '4',
          name: 'Deepa Singh',
          email: 'deepa.singh@example.com',
          registeredDate: '2023-01-30',
          premiumStatus: false,
          lastLogin: '2023-04-01T11:20:00',
          accountStatus: 'inactive'
        },
        {
          id: '5',
          name: 'Vikram Joshi',
          email: 'vikram.joshi@example.com',
          registeredDate: '2023-02-10',
          premiumStatus: true,
          lastLogin: '2023-04-07T16:30:00',
          accountStatus: 'active'
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and search functionality
  const filteredUsers = users.filter((user) => {
    // Apply status filter
    if (filter === 'premium' && !user.premiumStatus) return false;
    if (filter === 'free' && user.premiumStatus) return false;
    if (filter === 'active' && user.accountStatus !== 'active') return false;
    if (filter === 'inactive' && user.accountStatus !== 'inactive') return false;

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.id.toLowerCase().includes(search)
      );
    }
    
    return true;
  });

  // Handle premium status toggle
  const handlePremiumToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, premiumStatus: !user.premiumStatus } 
        : user
    ));
    
    // In a real app, this would make an API call to update the user's status
    console.log(`Toggled premium status for user ${userId}`);
  };

  // Handle account status toggle
  const handleStatusToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, accountStatus: newStatus } 
        : user
    ));
    
    // In a real app, this would make an API call to update the user's status
    console.log(`Changed account status for user ${userId} to ${newStatus}`);
  };

  return (
    <>
      <Head>
        <title>User Management | UPSCMONK Admin</title>
        <meta name="description" content="Manage users on the UPSCMONK platform" />
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
                  <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8">
                    Overview
                  </a>
                </Link>

                <Link href="/admin/content-management" legacyBehavior>
                  <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8">
                    Content Management
                  </a>
                </Link>

                <Link href="/admin/user-management" legacyBehavior>
                  <a className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8">
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

            {/* User Management Content */}
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">User Management</h2>
              
              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      filter === 'all' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    All Users
                  </button>
                  <button
                    onClick={() => setFilter('premium')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      filter === 'premium' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Premium Users
                  </button>
                  <button
                    onClick={() => setFilter('free')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      filter === 'free' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Free Users
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      filter === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Active Users
                  </button>
                  <button
                    onClick={() => setFilter('inactive')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      filter === 'inactive' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Inactive Users
                  </button>
                </div>
                <div className="w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {loading ? (
                  <div className="flex justify-center items-center p-12">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registered On
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Premium
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-500 font-medium">
                                    {user.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(user.registeredDate).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${user.accountStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {user.accountStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${user.premiumStatus ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                {user.premiumStatus ? 'Premium' : 'Free'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(user.lastLogin).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-3">
                                <button 
                                  onClick={() => handlePremiumToggle(user.id)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  {user.premiumStatus ? 'Remove Premium' : 'Add Premium'}
                                </button>
                                <button 
                                  onClick={() => handleStatusToggle(user.id, user.accountStatus)}
                                  className={`${user.accountStatus === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                                >
                                  {user.accountStatus === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                                <button 
                                  onClick={() => router.push(`/admin/user-management/${user.id}`)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                            No users found matching your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4" aria-label="Pagination">
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                    <span className="font-medium">{filteredUsers.length}</span> results
                  </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 opacity-50 cursor-not-allowed">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 opacity-50 cursor-not-allowed">
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;