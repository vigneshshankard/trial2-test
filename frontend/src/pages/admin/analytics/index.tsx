import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import chart components with dynamic loading to avoid SSR issues
const LineChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const BarChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const PieChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const DonutChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Analytics = () => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState('month');
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState({});

  // Set isClient to true when component mounts on client-side to avoid SSR issues with charts
  useEffect(() => {
    setIsClient(true);
    generateChartData(dateRange);
  }, []);

  // Generate mock data for charts based on selected date range
  const generateChartData = (range) => {
    // Define data points based on range
    let days = [];
    let userEngagement = [];
    let contentViews = [];
    let testAttempts = [];
    let revenue = [];

    if (range === 'week') {
      days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      userEngagement = [320, 350, 400, 380, 410, 450, 420];
      contentViews = [1200, 1350, 1500, 1400, 1600, 1800, 1700];
      testAttempts = [350, 320, 400, 380, 420, 490, 460];
      revenue = [12500, 13000, 15000, 14000, 16000, 18000, 17000];
    } else if (range === 'month') {
      days = Array.from({ length: 30 }, (_, i) => i + 1);
      userEngagement = Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) + 300);
      contentViews = Array.from({ length: 30 }, () => Math.floor(Math.random() * 800) + 1000);
      testAttempts = Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) + 300);
      revenue = Array.from({ length: 30 }, () => Math.floor(Math.random() * 8000) + 10000);
    } else if (range === 'quarter') {
      days = ['Jan', 'Feb', 'Mar'];
      userEngagement = [10500, 12000, 11500];
      contentViews = [45000, 48000, 46500];
      testAttempts = [12500, 13200, 12800];
      revenue = [420000, 450000, 440000];
    } else {
      days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      userEngagement = [9000, 9500, 10000, 10500, 11000, 12000, 12500, 13000, 12000, 11500, 11000, 12500];
      contentViews = [38000, 39000, 40000, 42000, 45000, 48000, 49000, 50000, 48000, 47000, 46000, 50000];
      testAttempts = [10000, 10500, 11000, 11500, 12000, 13000, 13500, 14000, 13000, 12500, 12000, 13500];
      revenue = [380000, 390000, 400000, 420000, 450000, 480000, 490000, 500000, 480000, 470000, 460000, 500000];
    }

    setChartData({
      days,
      userEngagement,
      contentViews,
      testAttempts,
      revenue
    });
  };

  // Handle date range change
  useEffect(() => {
    generateChartData(dateRange);
  }, [dateRange]);

  // Mock statistics data
  const statistics = {
    totalUsers: 25678,
    activeUsers: 18459,
    premiumUsers: 7823,
    userGrowthRate: 12.5,
    totalContent: 1568,
    popularCategory: 'Current Affairs',
    avgSessionTime: '18:45',
    avgCompletionRate: 78.2,
    totalRevenue: '₹45,78,900',
    revenueTrend: 15.8
  };

  return (
    <>
      <Head>
        <title>Analytics Dashboard | Admin | UPSCMONK</title>
        <meta name="description" content="Analytics dashboard for UPSCMONK platform" />
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
                  <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8">
                    User Management
                  </a>
                </Link>

                <Link href="/admin/analytics" legacyBehavior>
                  <a className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                    Analytics
                  </a>
                </Link>
              </nav>
            </div>

            {/* Analytics Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Platform Analytics</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Comprehensive insights and performance metrics
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <div className="relative inline-block text-left">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="week">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                  </select>
                </div>
                
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Report
                </button>
              </div>
            </div>

            {/* Statistics Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{statistics.totalUsers}</div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Increased by</span>
                            {statistics.userGrowthRate}%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Premium Users</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{statistics.premiumUsers}</div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Increased by</span>
                            18.3%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Avg. Session Duration</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{statistics.avgSessionTime}</div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Increased by</span>
                            8.2%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{statistics.totalRevenue}</div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Increased by</span>
                            {statistics.revenueTrend}%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-6">
              {/* User Engagement Chart */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">User Engagement</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Daily active users and session metrics</p>
                </div>
                <div className="p-6">
                  {isClient && chartData.days && (
                    <LineChart
                      options={{
                        chart: { id: 'user-engagement', toolbar: { show: false } },
                        xaxis: { categories: chartData.days },
                        stroke: { curve: 'smooth', width: 3 },
                        colors: ['#3B82F6'],
                        markers: { size: 4 },
                        tooltip: { y: { formatter: (val) => `${val} users` } }
                      }}
                      series={[{ name: 'Active Users', data: chartData.userEngagement }]}
                      type="line"
                      height={350}
                    />
                  )}
                </div>
              </div>

              {/* Content Analytics */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Content Performance</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Views and engagement by content type</p>
                  </div>
                  <div className="p-6">
                    {isClient && (
                      <BarChart
                        options={{
                          chart: { id: 'content-views', toolbar: { show: false } },
                          xaxis: { categories: chartData.days },
                          colors: ['#8B5CF6'],
                          plotOptions: { bar: { borderRadius: 4 } },
                          tooltip: { y: { formatter: (val) => `${val} views` } }
                        }}
                        series={[{ name: 'Content Views', data: chartData.contentViews }]}
                        type="bar"
                        height={300}
                      />
                    )}
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Test/Exam Performance</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Attempts and completion rates</p>
                  </div>
                  <div className="p-6">
                    {isClient && (
                      <BarChart
                        options={{
                          chart: { id: 'test-attempts', toolbar: { show: false } },
                          xaxis: { categories: chartData.days },
                          colors: ['#10B981'],
                          plotOptions: { bar: { borderRadius: 4 } },
                          tooltip: { y: { formatter: (val) => `${val} attempts` } }
                        }}
                        series={[{ name: 'Test Attempts', data: chartData.testAttempts }]}
                        type="bar"
                        height={300}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Revenue Analytics</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Revenue trends and subscription metrics</p>
                </div>
                <div className="p-6">
                  {isClient && chartData.days && (
                    <LineChart
                      options={{
                        chart: { id: 'revenue', toolbar: { show: false } },
                        xaxis: { categories: chartData.days },
                        stroke: { curve: 'smooth', width: 3 },
                        colors: ['#EF4444'],
                        markers: { size: 4 },
                        tooltip: { y: { formatter: (val) => `₹${val}` } }
                      }}
                      series={[{ name: 'Revenue', data: chartData.revenue }]}
                      type="line"
                      height={350}
                    />
                  )}
                </div>
              </div>

              {/* Content Distribution & User Demographics */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Content Distribution</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Content by category</p>
                  </div>
                  <div className="p-6">
                    {isClient && (
                      <DonutChart
                        options={{
                          chart: { type: 'donut' },
                          labels: ['Study Materials', 'Current Affairs', 'Mock Tests', 'Video Lectures', 'Practice Questions'],
                          colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'],
                          legend: { position: 'bottom' },
                          responsive: [{
                            breakpoint: 480,
                            options: {
                              chart: { width: 200 },
                              legend: { position: 'bottom' }
                            }
                          }]
                        }}
                        series={[35, 25, 20, 15, 5]}
                        type="donut"
                        height={300}
                      />
                    )}
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">User Demographics</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">User distribution by age group</p>
                  </div>
                  <div className="p-6">
                    {isClient && (
                      <PieChart
                        options={{
                          chart: { type: 'pie' },
                          labels: ['18-24', '25-30', '31-35', '36-45', '46+'],
                          colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'],
                          legend: { position: 'bottom' },
                          responsive: [{
                            breakpoint: 480,
                            options: {
                              chart: { width: 200 },
                              legend: { position: 'bottom' }
                            }
                          }]
                        }}
                        series={[45, 30, 15, 8, 2]}
                        type="pie"
                        height={300}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Reports Section */}
            <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Detailed Reports</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Download comprehensive analytics reports</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <button className="relative bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                          <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">User Activity Report</h4>
                          <p className="text-sm text-gray-500">Full user engagement analytics</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-blue-300 to-blue-600"></div>
                  </button>
                  
                  <button className="relative bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">Content Performance</h4>
                          <p className="text-sm text-gray-500">Resource usage and popularity</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-green-300 to-green-600"></div>
                  </button>
                  
                  <button className="relative bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                          <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">Revenue Report</h4>
                          <p className="text-sm text-gray-500">Detailed financial analysis</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-red-300 to-red-600"></div>
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

export default Analytics;