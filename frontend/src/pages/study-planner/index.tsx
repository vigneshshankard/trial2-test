import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  Calendar, ChevronLeft, ChevronRight, 
  Clipboard, BookOpen, Clock, Award, Search, 
  Filter, MoreHorizontal, FileText, RefreshCw, 
  FileCheck, Lightbulb
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';

// Types
interface StudyTask {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO date string
  startTime?: string; // 24-hour format (HH:MM)
  endTime?: string;
  duration?: number; // minutes
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'reading' | 'practice' | 'revision' | 'note_making' | 'mock_test';
  subject: string;
  topic?: string;
  isRecurring?: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
}

interface WeakArea {
  subject: string;
  topic: string;
  score: number; // 0-100
  priority: 'low' | 'medium' | 'high';
}

interface Subject {
  id: string;
  name: string;
  color: string;
  progress: number; // 0-100
}

interface CalendarView {
  month: number;
  year: number;
  selectedDate: Date;
}

// Mock data
const mockTasks: StudyTask[] = [
  {
    id: 'task-1',
    title: 'Indian Polity - Constitutional Framework',
    description: 'Read chapters 1-3 from Laxmikanth',
    date: '2025-04-09',
    startTime: '09:00',
    endTime: '11:00',
    duration: 120,
    completed: false,
    priority: 'high',
    category: 'reading',
    subject: 'Polity'
  },
  {
    id: 'task-2',
    title: 'Practice MCQs on Modern History',
    description: 'Complete 50 MCQs from the question bank',
    date: '2025-04-09',
    startTime: '13:00',
    endTime: '14:30',
    duration: 90,
    completed: true,
    priority: 'medium',
    category: 'practice',
    subject: 'History',
    topic: 'Modern India'
  },
  {
    id: 'task-3',
    title: 'Economics - Monetary Policy',
    description: 'Study RBI functions and monetary policy mechanisms',
    date: '2025-04-09',
    startTime: '16:00',
    endTime: '18:00',
    duration: 120,
    completed: false,
    priority: 'medium',
    category: 'reading',
    subject: 'Economics'
  },
  {
    id: 'task-4',
    title: 'Geography - Climatology Revision',
    description: 'Revise climate types and patterns',
    date: '2025-04-10',
    startTime: '10:00',
    endTime: '12:00',
    duration: 120,
    completed: false,
    priority: 'low',
    category: 'revision',
    subject: 'Geography',
    topic: 'Climatology'
  },
  {
    id: 'task-5',
    title: 'CSAT Mock Test',
    description: 'Take full-length CSAT paper under timed conditions',
    date: '2025-04-11',
    startTime: '09:00',
    endTime: '11:00',
    duration: 120,
    completed: false,
    priority: 'high',
    category: 'mock_test',
    subject: 'CSAT'
  }
];

const mockWeakAreas: WeakArea[] = [
  { subject: 'Economics', topic: 'Monetary Policy', score: 48, priority: 'high' },
  { subject: 'Geography', topic: 'Climatology', score: 56, priority: 'medium' },
  { subject: 'History', topic: 'Ancient India', score: 62, priority: 'medium' },
  { subject: 'Science', topic: 'Physics', score: 45, priority: 'high' }
];

const mockSubjects: Subject[] = [
  { id: 'polity', name: 'Indian Polity', color: '#4F46E5', progress: 65 },
  { id: 'history', name: 'History', color: '#EC4899', progress: 48 },
  { id: 'geography', name: 'Geography', color: '#10B981', progress: 72 },
  { id: 'economics', name: 'Economics', color: '#F59E0B', progress: 53 },
  { id: 'science', name: 'Science & Technology', color: '#6366F1', progress: 37 }
];

const categoryIcons = {
  reading: <BookOpen size={16} />,
  practice: <Clipboard size={16} />,
  revision: <RefreshCw size={16} />,
  note_making: <FileText size={16} />,
  mock_test: <FileCheck size={16} />
};

const categoryLabels = {
  reading: 'Reading',
  practice: 'Practice',
  revision: 'Revision',
  note_making: 'Note Making',
  mock_test: 'Mock Test'
};

const priorityColors = {
  low: 'bg-neutral-100 text-neutral-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-error-100 text-error-700'
};

// Utility functions
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const generateDatesForMonth = (year: number, month: number): Date[] => {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const days: Date[] = [];

  // Previous month days to fill the first week
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
  
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(new Date(prevMonthYear, prevMonth, daysInPrevMonth - i));
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  // Next month days to fill the remaining cells
  const remainingDays = 42 - days.length; // 6 rows * 7 days
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(nextMonthYear, nextMonth, i));
  }

  return days;
};

const StudyPlannerPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  
  // Calendar state
  const today = new Date();
  const [calendarView, setCalendarView] = useState<CalendarView>({
    month: today.getMonth(),
    year: today.getFullYear(),
    selectedDate: today
  });
  
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<StudyTask | null>(null);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [weakAreas, setWeakAreas] = useState<WeakArea[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  // Filter states
  const [subjectFilter, setSubjectFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // New task form
  const [newTask, setNewTask] = useState<Partial<StudyTask>>({
    title: '',
    date: formatDate(today),
    priority: 'medium',
    category: 'reading',
    completed: false,
    subject: ''
  });

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('userToken');
    
    if (!token) {
      router.push('/login?redirect=/study-planner');
      return;
    }
    
    // Set premium status (would come from API in real app)
    setIsPremiumUser(Math.random() > 0.5);
    
    // Fetch data
    fetchStudyPlannerData();
    
    // Generate calendar days
    const days = generateDatesForMonth(calendarView.year, calendarView.month);
    setCalendarDays(days);
  }, [router]);

  useEffect(() => {
    // Update calendar days when month/year changes
    const days = generateDatesForMonth(calendarView.year, calendarView.month);
    setCalendarDays(days);
  }, [calendarView.month, calendarView.year]);

  const fetchStudyPlannerData = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, these would be API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTasks(mockTasks);
      setWeakAreas(mockWeakAreas);
      setSubjects(mockSubjects);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching study planner data:', error);
      setIsLoading(false);
    }
  };
  
  const handlePreviousMonth = () => {
    setCalendarView(prev => {
      const newMonth = prev.month === 0 ? 11 : prev.month - 1;
      const newYear = prev.month === 0 ? prev.year - 1 : prev.year;
      return {
        ...prev,
        month: newMonth,
        year: newYear
      };
    });
  };
  
  const handleNextMonth = () => {
    setCalendarView(prev => {
      const newMonth = prev.month === 11 ? 0 : prev.month + 1;
      const newYear = prev.month === 11 ? prev.year + 1 : prev.year;
      return {
        ...prev,
        month: newMonth,
        year: newYear
      };
    });
  };
  
  const handleDateSelect = (date: Date) => {
    setCalendarView(prev => ({
      ...prev,
      selectedDate: date
    }));
  };
  
  const getTasksForSelectedDate = () => {
    const dateStr = formatDate(calendarView.selectedDate);
    return tasks.filter(task => task.date === dateStr);
  };

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleTaskEdit = (task: StudyTask) => {
    setSelectedTask(task);
    setNewTask(task);
    setTaskFormOpen(true);
  };

  const handleRequestAIRecommendations = () => {
    setShowAIRecommendations(!showAIRecommendations);
    
    // In a real app, this would make an API call to get AI recommendations
    // For now, we just toggle the visibility of the recommendations section
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setNewTask({
      title: '',
      date: formatDate(calendarView.selectedDate),
      priority: 'medium',
      category: 'reading',
      completed: false,
      subject: ''
    });
    setTaskFormOpen(true);
  };

  const handleSaveTask = () => {
    if (!newTask.title || !newTask.date || !newTask.subject) {
      alert('Please fill all required fields');
      return;
    }
    
    if (selectedTask) {
      // Update existing task
      setTasks(prev => 
        prev.map(task => 
          task.id === selectedTask.id ? { ...task, ...newTask } as StudyTask : task
        )
      );
    } else {
      // Create new task
      const task: StudyTask = {
        id: `task-${Date.now()}`,
        title: newTask.title!,
        description: newTask.description,
        date: newTask.date!,
        startTime: newTask.startTime,
        endTime: newTask.endTime,
        duration: newTask.duration,
        completed: false,
        priority: newTask.priority as 'low' | 'medium' | 'high',
        category: newTask.category as 'reading' | 'practice' | 'revision' | 'note_making' | 'mock_test',
        subject: newTask.subject!,
        topic: newTask.topic
      };
      
      setTasks(prev => [...prev, task]);
    }
    
    setTaskFormOpen(false);
  };

  const toggleFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case 'subject':
        setSubjectFilter(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value) 
            : [...prev, value]
        );
        break;
        
      case 'category':
        setCategoryFilter(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value) 
            : [...prev, value]
        );
        break;
        
      case 'priority':
        setPriorityFilter(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value) 
            : [...prev, value]
        );
        break;
    }
  };
  
  const resetFilters = () => {
    setSubjectFilter([]);
    setCategoryFilter([]);
    setPriorityFilter([]);
  };

  const getTasksWithFilters = () => {
    return tasks.filter(task => {
      // Apply subject filter
      if (subjectFilter.length > 0 && !subjectFilter.includes(task.subject)) {
        return false;
      }
      
      // Apply category filter
      if (categoryFilter.length > 0 && !categoryFilter.includes(task.category)) {
        return false;
      }
      
      // Apply priority filter
      if (priorityFilter.length > 0 && !priorityFilter.includes(task.priority)) {
        return false;
      }
      
      return true;
    });
  };

  const getCountOfTasksPerDate = (date: Date): number => {
    const dateStr = formatDate(date);
    return tasks.filter(task => task.date === dateStr).length;
  };

  // Check if a date is in the current month being viewed
  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === calendarView.month && date.getFullYear() === calendarView.year;
  };

  // Check if a date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  // Check if a date is selected
  const isSelected = (date: Date): boolean => {
    return date.getDate() === calendarView.selectedDate.getDate() && 
           date.getMonth() === calendarView.selectedDate.getMonth() && 
           date.getFullYear() === calendarView.selectedDate.getFullYear();
  };

  // Get all available categories
  const allCategories = Object.keys(categoryLabels);

  const getMonthName = (month: number): string => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };

  const getTaskBackgroundColor = (task: StudyTask): string => {
    if (task.completed) {
      return 'bg-neutral-100';
    }
    
    const subject = subjects.find(s => s.name === task.subject || s.id === task.subject);
    if (subject) {
      return `bg-opacity-10 border-l-4` + 
        (task.subject === 'Indian Polity' ? ' bg-indigo-100 border-indigo-500' :
        task.subject === 'History' ? ' bg-pink-100 border-pink-500' :
        task.subject === 'Geography' ? ' bg-emerald-100 border-emerald-500' :
        task.subject === 'Economics' ? ' bg-amber-100 border-amber-500' :
        ' bg-blue-100 border-blue-500');
    }
    
    return 'bg-white';
  };

  return (
    <Layout userRole="free">
      <Head>
        <title>Study Planner | UPSCMONK</title>
      </Head>
      
      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 py-8">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Study Planner</h1>
                <p className="text-neutral-600 mt-1">
                  Organize your UPSC preparation with daily tasks and AI recommendations
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  leftIcon={<Filter size={18} />}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filters
                </Button>
                
                <Button 
                  variant="outline" 
                  leftIcon={<Lightbulb size={18} />}
                  onClick={handleRequestAIRecommendations}
                >
                  AI Recommendations
                </Button>
                
                <Button 
                  variant="primary" 
                  leftIcon={<FileText size={18} />}
                  onClick={handleCreateTask}
                >
                  Add Task
                </Button>
              </div>
            </div>

            {/* Filters section */}
            {showFilters && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Subject filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <BookOpen size={16} className="mr-1" />
                      Subjects
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map(subject => (
                        <button
                          key={subject.id}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            subjectFilter.includes(subject.name)
                              ? 'bg-primary text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                          onClick={() => toggleFilter('subject', subject.name)}
                        >
                          {subject.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Category filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <FileText size={16} className="mr-1" />
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map(category => (
                        <button
                          key={category}
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                            categoryFilter.includes(category)
                              ? 'bg-primary text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                          onClick={() => toggleFilter('category', category)}
                        >
                          {categoryIcons[category as keyof typeof categoryIcons]}
                          {categoryLabels[category as keyof typeof categoryLabels]}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Priority filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Award size={16} className="mr-1" />
                      Priority
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['low', 'medium', 'high'].map(priority => (
                        <button
                          key={priority}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            priorityFilter.includes(priority)
                              ? 'bg-primary text-white'
                              : priorityColors[priority as keyof typeof priorityColors]
                          }`}
                          onClick={() => toggleFilter('priority', priority)}
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    className="text-sm text-neutral-600 hover:text-neutral-800 mr-4"
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                  
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container py-8">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 flex items-center justify-center">
              <div className="animate-pulse space-y-6 w-full max-w-4xl">
                <div className="h-10 bg-neutral-200 rounded-md w-3/4"></div>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(35)].map((_, i) => (
                    <div key={i} className="h-20 bg-neutral-200 rounded-md"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar size={20} className="text-primary" />
                    <h2 className="text-xl font-bold">Calendar</h2>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-2 rounded-full hover:bg-neutral-100"
                      onClick={handlePreviousMonth}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-lg font-medium min-w-[140px] text-center">
                      {getMonthName(calendarView.month)} {calendarView.year}
                    </h3>
                    <button 
                      className="p-2 rounded-full hover:bg-neutral-100"
                      onClick={handleNextMonth}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day names */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={day} className="text-center p-2 text-sm font-medium text-neutral-500">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {calendarDays.map((date, index) => {
                    const isInCurrentMonth = isCurrentMonth(date);
                    const isTodayDate = isToday(date);
                    const isSelectedDate = isSelected(date);
                    const taskCount = getCountOfTasksPerDate(date);
                    
                    return (
                      <div 
                        key={index} 
                        className={`aspect-square p-1 rounded-lg ${
                          isInCurrentMonth ? '' : 'opacity-40'
                        } ${isSelectedDate ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => isInCurrentMonth && handleDateSelect(date)}
                      >
                        <div className={`h-full rounded-lg p-1 flex flex-col ${
                          isTodayDate ? 'bg-primary-50' : 'hover:bg-neutral-50'
                        } cursor-pointer`}>
                          <div className={`text-sm font-medium mb-1 ${
                            isTodayDate ? 'text-primary' : ''
                          } ${isSelectedDate ? 'text-primary' : ''}`}>
                            {date.getDate()}
                          </div>
                          
                          {taskCount > 0 && (
                            <div className="mt-auto">
                              <div className={`text-xs px-2 py-1 rounded-full text-center ${
                                isTodayDate ? 'bg-primary text-white' : 
                                'bg-neutral-100 text-neutral-600'
                              }`}>
                                {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected date tasks */}
                <div className="mt-8 border-t border-neutral-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">
                      Tasks for {calendarView.selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </h3>
                    
                    {getTasksForSelectedDate().length === 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        leftIcon={<FileText size={16} />}
                        onClick={handleCreateTask}
                      >
                        Add Task
                      </Button>
                    )}
                  </div>
                  
                  {getTasksForSelectedDate().length === 0 ? (
                    <div className="text-center py-12 bg-neutral-50 rounded-lg">
                      <Calendar className="mx-auto text-neutral-300 mb-2" size={32} />
                      <p className="text-neutral-500">No tasks scheduled for this day</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-4"
                        leftIcon={<FileText size={16} />}
                        onClick={handleCreateTask}
                      >
                        Add Task
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {getTasksForSelectedDate().map(task => (
                        <div 
                          key={task.id} 
                          className={`rounded-lg p-4 flex items-start 
                            ${getTaskBackgroundColor(task)} 
                            ${task.completed ? 'opacity-60' : ''}`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            <button
                              className={`w-5 h-5 rounded-full border ${
                                task.completed ? 
                                'bg-primary border-primary' : 
                                'border-neutral-300'
                              } flex items-center justify-center`}
                              onClick={() => handleTaskComplete(task.id, !task.completed)}
                            >
                              {task.completed && <FileCheck size={12} className="text-white" />}
                            </button>
                          </div>
                          
                          <div className="ml-3 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className={`font-medium ${task.completed ? 'line-through text-neutral-500' : ''}`}>
                                {task.title}
                              </h4>
                              
                              <div className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </div>
                              
                              <div className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 flex items-center gap-1">
                                {categoryIcons[task.category]}
                                {categoryLabels[task.category]}
                              </div>
                            </div>
                            
                            {task.description && (
                              <p className="text-sm text-neutral-600 mb-2">
                                {task.description}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                              {task.startTime && task.endTime && (
                                <span className="flex items-center gap-1">
                                  <Clock size={12} />
                                  {task.startTime} - {task.endTime}
                                </span>
                              )}
                              
                              {task.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock size={12} />
                                  {Math.floor(task.duration / 60)}h {task.duration % 60 > 0 ? `${task.duration % 60}m` : ''}
                                </span>
                              )}
                              
                              <span className="flex items-center gap-1">
                                <BookOpen size={12} />
                                {task.subject}
                                {task.topic && ` - ${task.topic}`}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center ml-2">
                            <button 
                              className="p-1 hover:bg-neutral-100 rounded-full"
                              onClick={() => handleTaskEdit(task)}
                            >
                              <FileText size={16} className="text-neutral-500" />
                            </button>
                            <button 
                              className="p-1 hover:bg-neutral-100 rounded-full"
                              onClick={() => handleTaskDelete(task.id)}
                            >
                              <FileCheck size={16} className="text-neutral-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Progress overview */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold mb-4 flex items-center">
                    <Search className="mr-2" size={18} />
                    Subject Progress
                  </h2>
                  
                  <div className="space-y-4">
                    {subjects.map(subject => (
                      <div key={subject.id} className="">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">{subject.name}</div>
                          <div className="text-sm">{subject.progress}%</div>
                        </div>
                        <div className="h-2 bg-neutral-100 rounded-full">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${subject.progress}%`,
                              backgroundColor: subject.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Weak areas */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold flex items-center">
                      <Award className="mr-2" size={18} />
                      Focus Areas
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      rightIcon={<ChevronRight size={16} />}
                      onClick={() => router.push('/dashboard/analytics')}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {weakAreas.map((area, index) => (
                      <div key={index} className="p-3 rounded-lg bg-neutral-50">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-sm">
                            {area.topic}
                          </h3>
                          <div className={`text-xs px-2 py-0.5 rounded-full ${
                            area.priority === 'high' ? 'bg-error-100 text-error-700' :
                            area.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-neutral-100 text-neutral-700'
                          }`}>
                            {area.priority}
                          </div>
                        </div>
                        <p className="text-xs text-neutral-500 mb-2">{area.subject}</p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <span className="text-neutral-500 mr-1">Score:</span>
                            <span className={
                              area.score < 50 ? 'text-error' :
                              area.score < 70 ? 'text-amber-600' :
                              'text-success'
                            }>{area.score}%</span>
                          </div>
                          
                          <button className="text-primary flex items-center hover:underline">
                            Add study task <FileText size={12} className="ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* AI recommendations - Premium feature */}
                {showAIRecommendations && (
                  <div className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20">
                      <div className="bg-amber-500 text-white text-xs font-bold px-5 py-1 shadow-md transform rotate-45 absolute top-3 right-[-35px]">
                        PREMIUM
                      </div>
                    </div>
                    
                    <h2 className="text-lg font-bold mb-4 flex items-center">
                      <Lightbulb className="mr-2" size={18} />
                      AI Recommendations
                    </h2>
                    
                    {isPremiumUser ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-primary-50 border border-primary-100">
                          <h3 className="font-medium mb-2 flex items-center text-primary-800">
                            <Lightbulb size={16} className="mr-1" />
                            Study Plan Optimization
                          </h3>
                          <p className="text-sm text-neutral-700 mb-3">
                            Based on your performance, we recommend focusing more on Economics 
                            and Science & Technology. Try allocating at least 4 hours per week 
                            to each of these subjects.
                          </p>
                          <Button 
                            variant="primary" 
                            size="sm"
                            fullWidth
                          >
                            Apply to Study Plan
                          </Button>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-neutral-50">
                          <h3 className="font-medium mb-2">Suggested Tasks</h3>
                          <div className="space-y-2">
                            <div className="p-2 rounded bg-white border border-neutral-200">
                              <div className="flex justify-between">
                                <div className="text-sm font-medium">Economics - Monetary Policy MCQs</div>
                                <button className="text-primary">
                                  <FileText size={16} />
                                </button>
                              </div>
                              <p className="text-xs text-neutral-500">Practice 30 MCQs (45 min)</p>
                            </div>
                            <div className="p-2 rounded bg-white border border-neutral-200">
                              <div className="flex justify-between">
                                <div className="text-sm font-medium">Science - Physics Study Session</div>
                                <button className="text-primary">
                                  <FileText size={16} />
                                </button>
                              </div>
                              <p className="text-xs text-neutral-500">Read chapters 3-4 (90 min)</p>
                            </div>
                            <div className="p-2 rounded bg-white border border-neutral-200">
                              <div className="flex justify-between">
                                <div className="text-sm font-medium">Geography - Revision Quiz</div>
                                <button className="text-primary">
                                  <FileText size={16} />
                                </button>
                              </div>
                              <p className="text-xs text-neutral-500">Revise climatology concepts (60 min)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <Lightbulb className="mx-auto text-neutral-300 mb-3" size={48} />
                        <h3 className="font-bold text-lg mb-2">Unlock AI Study Planner</h3>
                        <p className="text-sm text-neutral-600 mb-4">
                          Get personalized study recommendations and adaptive planning with our premium AI features
                        </p>
                        <Button 
                          variant="primary"
                          onClick={() => router.push('/pricing')}
                        >
                          Upgrade to Premium
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Weekly Task Overview */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold mb-4 flex items-center">
                    <Calendar className="mr-2" size={18} />
                    Weekly Overview
                  </h2>
                  
                  <div className="space-y-2">
                    {['reading', 'practice', 'revision', 'mock_test'].map((category) => {
                      const tasksInCategory = getTasksWithFilters().filter(t => t.category === category);
                      const completedCount = tasksInCategory.filter(t => t.completed).length;
                      const totalCount = tasksInCategory.length;
                      const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
                      
                      return (
                        <div key={category} className="p-3 rounded-lg bg-neutral-50">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              {categoryIcons[category as keyof typeof categoryIcons]}
                              <h3 className="font-medium text-sm ml-2">
                                {categoryLabels[category as keyof typeof categoryLabels]}
                              </h3>
                            </div>
                            <span className="text-sm">
                              {completedCount}/{totalCount}
                            </span>
                          </div>
                          
                          <div className="h-2 bg-neutral-100 rounded-full">
                            <div 
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Task Form Modal */}
      {taskFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">
                  {selectedTask ? 'Edit Task' : 'Add New Task'}
                </h2>
                <button 
                  className="text-neutral-500 hover:text-neutral-800"
                  onClick={() => setTaskFormOpen(false)}
                >
                  <FileCheck size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-neutral-300 rounded-md"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full p-2 border border-neutral-300 rounded-md h-20"
                    placeholder="Task description (optional)"
                    value={newTask.description || ''}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Date*
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-neutral-300 rounded-md"
                      value={newTask.date}
                      onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-neutral-300 rounded-md"
                      placeholder="e.g., 60"
                      value={newTask.duration || ''}
                      onChange={(e) => setNewTask({...newTask, duration: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="w-full p-2 border border-neutral-300 rounded-md"
                      value={newTask.startTime || ''}
                      onChange={(e) => setNewTask({...newTask, startTime: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="w-full p-2 border border-neutral-300 rounded-md"
                      value={newTask.endTime || ''}
                      onChange={(e) => setNewTask({...newTask, endTime: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Subject*
                  </label>
                  <select
                    className="w-full p-2 border border-neutral-300 rounded-md"
                    value={newTask.subject}
                    onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                    required
                  >
                    <option value="">Select a subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.name}>{subject.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Topic
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-neutral-300 rounded-md"
                    placeholder="e.g., Constitutional Framework, Modern History"
                    value={newTask.topic || ''}
                    onChange={(e) => setNewTask({...newTask, topic: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Category*
                    </label>
                    <select
                      className="w-full p-2 border border-neutral-300 rounded-md"
                      value={newTask.category}
                      onChange={(e) => setNewTask({...newTask, category: e.target.value as any})}
                    >
                      {allCategories.map(category => (
                        <option key={category} value={category}>
                          {categoryLabels[category as keyof typeof categoryLabels]}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Priority*
                    </label>
                    <select
                      className="w-full p-2 border border-neutral-300 rounded-md"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setTaskFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary"
                  onClick={handleSaveTask}
                >
                  {selectedTask ? 'Save Changes' : 'Add Task'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StudyPlannerPage;