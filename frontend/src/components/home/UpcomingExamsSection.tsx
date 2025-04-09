import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Bell, Calendar, ChevronRight, FileText, Clock, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Card, { CardContent } from '../ui/Card';

// Mock data for upcoming exams - in a real application, this would come from an API
const upcomingExams = [
  {
    id: '1',
    name: 'UPSC Civil Services Preliminary Examination 2025',
    date: '2025-06-01',
    applicationDeadline: '2025-03-25',
    admitCardDate: '2025-05-15',
    examLevel: 'Preliminary',
    importanceLevel: 'high',
    eligibility: 'Graduates from any discipline',
    registrationUrl: '/exams/upsc-cse-prelims-2025',
    notificationType: 'official',
  },
  {
    id: '2',
    name: 'UPSC Engineering Services Examination (ESE) 2025',
    date: '2025-06-28',
    applicationDeadline: '2025-04-10',
    admitCardDate: '2025-06-10',
    examLevel: 'Preliminary',
    importanceLevel: 'medium',
    eligibility: 'Engineering graduates in relevant disciplines',
    registrationUrl: '/exams/upsc-ese-prelims-2025',
    notificationType: 'official',
  },
  {
    id: '3',
    name: 'UPSC Combined Medical Services Examination 2025',
    date: '2025-07-15',
    applicationDeadline: '2025-04-22',
    admitCardDate: '2025-06-25',
    examLevel: 'Main',
    importanceLevel: 'medium',
    eligibility: 'MBBS degree holders',
    registrationUrl: '/exams/upsc-cmse-2025',
    notificationType: 'official',
  },
  {
    id: '4',
    name: 'UPSC Civil Services Main Examination 2025',
    date: '2025-09-15',
    applicationDeadline: 'To be announced',
    admitCardDate: '2025-09-01',
    examLevel: 'Main',
    importanceLevel: 'high',
    eligibility: 'Candidates who cleared CSE Prelims 2025',
    registrationUrl: '/exams/upsc-cse-mains-2025',
    notificationType: 'upcoming',
  },
  {
    id: '5',
    name: 'UPSC National Defence Academy (NDA) Examination 2025-II',
    date: '2025-09-07',
    applicationDeadline: '2025-06-15',
    admitCardDate: '2025-08-20',
    examLevel: 'Main',
    importanceLevel: 'medium',
    eligibility: '12th pass candidates (for Army/Navy), 12th with Physics & Math (for Air Force)',
    registrationUrl: '/exams/upsc-nda-ii-2025',
    notificationType: 'official',
  },
  {
    id: '6',
    name: 'UPSC Combined Defence Services (CDS) Examination 2025-II',
    date: '2025-11-09',
    applicationDeadline: '2025-07-30',
    admitCardDate: '2025-10-20',
    examLevel: 'Main',
    importanceLevel: 'medium',
    eligibility: 'Unmarried graduates, age between 22-27 years',
    registrationUrl: '/exams/upsc-cds-ii-2025',
    notificationType: 'upcoming',
  },
];

// Helper function to format dates in a readable format
const formatDate = (dateString: string): string => {
  if (dateString === 'To be announced') return dateString;
  
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    weekday: 'short' 
  };
  return date.toLocaleDateString('en-US', options);
};

// Calculate days left until a date
const getDaysLeft = (dateString: string): number | null => {
  if (dateString === 'To be announced') return null;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateString);
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Sort exams by date (closest first)
const sortedExams = [...upcomingExams].sort((a, b) => {
  if (a.date === 'To be announced') return 1;
  if (b.date === 'To be announced') return -1;
  return new Date(a.date).getTime() - new Date(b.date).getTime();
});

const UpcomingExamsSection: React.FC = () => {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState<string>(sortedExams[0].id);
  const [filter, setFilter] = useState<'all' | 'high' | 'prelims' | 'mains'>('all');

  // Apply filters
  const filteredExams = sortedExams.filter(exam => {
    if (filter === 'all') return true;
    if (filter === 'high') return exam.importanceLevel === 'high';
    if (filter === 'prelims') return exam.examLevel === 'Preliminary';
    if (filter === 'mains') return exam.examLevel === 'Main';
    return true;
  });

  // Get the selected exam details
  const examDetails = upcomingExams.find(exam => exam.id === selectedExam);

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-12">
          <div>
            <h2 className="mb-4">Upcoming Exam Notifications</h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Stay on top of all UPSC exam dates, application deadlines, and admit card releases.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'secondary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'high' ? 'secondary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('high')}
            >
              High Priority
            </Button>
            <Button 
              variant={filter === 'prelims' ? 'secondary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('prelims')}
            >
              Prelims
            </Button>
            <Button 
              variant={filter === 'mains' ? 'secondary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('mains')}
            >
              Mains
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline View */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-neutral-100 bg-neutral-50">
                <h3 className="font-medium">Exam Timeline</h3>
              </div>
              
              <div className="divide-y divide-neutral-100 max-h-[600px] overflow-y-auto">
                {filteredExams.map((exam) => {
                  const daysLeft = getDaysLeft(exam.date);
                  const isUrgent = daysLeft !== null && daysLeft <= 30;
                  const isPast = daysLeft !== null && daysLeft < 0;
                  
                  return (
                    <div
                      key={exam.id}
                      className={`p-4 cursor-pointer transition ${
                        selectedExam === exam.id 
                          ? 'bg-primary-50 border-l-4 border-primary' 
                          : 'hover:bg-neutral-50'
                      } ${isPast ? 'opacity-60' : ''}`}
                      onClick={() => setSelectedExam(exam.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Calendar 
                            size={16}
                            className={`mr-2 ${
                              exam.importanceLevel === 'high' 
                                ? 'text-error' 
                                : 'text-secondary'
                            }`}
                          />
                          <span className={`text-xs py-0.5 px-2 rounded-full ${
                            exam.examLevel === 'Preliminary' 
                              ? 'bg-secondary-50 text-secondary' 
                              : 'bg-primary-50 text-primary'
                          }`}>
                            {exam.examLevel}
                          </span>
                        </div>
                        
                        {exam.notificationType === 'official' && (
                          <span className="bg-accent-50 text-accent-700 text-xs py-0.5 px-2 rounded-full">
                            Official
                          </span>
                        )}
                      </div>
                      
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {exam.name}
                      </h4>
                      
                      <div className="flex items-center text-xs text-neutral-500">
                        <Clock size={12} className="mr-1" />
                        <span>{formatDate(exam.date)}</span>
                        
                        {daysLeft !== null && (
                          <span className={`ml-2 py-0.5 px-1 rounded ${
                            isUrgent ? 'bg-error-50 text-error' : 'bg-neutral-100'
                          }`}>
                            {daysLeft < 0 
                              ? 'Past' 
                              : daysLeft === 0 
                                ? 'Today' 
                                : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {filteredExams.length === 0 && (
                  <div className="p-6 text-center text-neutral-500">
                    No exams match your filter criteria
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-neutral-100 bg-neutral-50 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight size={14} />}
                  onClick={() => router.push('/exams')}
                >
                  View All Exams
                </Button>
              </div>
            </div>
          </div>
          
          {/* Exam Details */}
          <div className="lg:col-span-2">
            {examDetails && (
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block w-3 h-3 rounded-full ${
                          examDetails.importanceLevel === 'high'
                            ? 'bg-error' 
                            : 'bg-secondary'
                        }`} />
                        <span className={`text-sm font-medium ${
                          examDetails.importanceLevel === 'high'
                            ? 'text-error' 
                            : 'text-secondary'
                        }`}>
                          {examDetails.importanceLevel === 'high' 
                            ? 'High Priority' 
                            : 'Medium Priority'}
                        </span>
                        
                        <span className="text-neutral-300 mx-2">|</span>
                        
                        <span className={`text-sm font-medium py-0.5 px-2 rounded-full ${
                          examDetails.examLevel === 'Preliminary' 
                            ? 'bg-secondary-50 text-secondary' 
                            : 'bg-primary-50 text-primary'
                        }`}>
                          {examDetails.examLevel} Exam
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-1">{examDetails.name}</h3>
                      
                      <div className="flex items-center text-sm text-neutral-600">
                        <Calendar size={16} className="mr-2" />
                        <span>Exam Date: {formatDate(examDetails.date)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Button 
                        variant="accent" 
                        rightIcon={<ArrowRight size={16} />}
                        onClick={() => router.push(examDetails.registrationUrl)}
                      >
                        Registration Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-medium flex items-center mb-3">
                        <Bell size={16} className="mr-2 text-primary" />
                        Important Dates
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-neutral-600">Application Deadline:</span>
                          <span className="font-medium">{examDetails.applicationDeadline}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-neutral-600">Admit Card Release:</span>
                          <span className="font-medium">{examDetails.admitCardDate}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-neutral-600">Exam Date:</span>
                          <span className="font-medium">{formatDate(examDetails.date)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-medium flex items-center mb-3">
                        <FileText size={16} className="mr-2 text-primary" />
                        Eligibility
                      </h4>
                      <p className="text-sm text-neutral-600">{examDetails.eligibility}</p>
                      
                      <div className="mt-4 pt-3 border-t border-neutral-200">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          onClick={() => router.push(`${examDetails.registrationUrl}/eligibility`)}
                        >
                          View Detailed Eligibility Criteria
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 p-5 rounded-lg">
                    <h4 className="font-medium mb-3">Prepare for this exam</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button 
                        variant="primary" 
                        size="sm"
                        className="text-sm"
                        onClick={() => router.push(`/mock-tests/${examDetails.id}`)}
                      >
                        Practice Mock Tests
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-sm"
                        onClick={() => router.push(`/study-materials/${examDetails.id}`)}
                      >
                        Study Materials
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-sm"
                        onClick={() => router.push(`/previous-papers/${examDetails.id}`)}
                      >
                        Previous Year Papers
                      </Button>
                    </div>
                    <p className="text-xs text-neutral-600 mt-3">
                      Set up custom alerts for this exam to receive notifications about important updates
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-neutral-600 mb-4">
            Never miss an important UPSC notification. Sign up to receive alerts directly to your email or mobile.
          </p>
          <Button 
            variant="secondary" 
            rightIcon={<Bell size={16} />}
            onClick={() => router.push('/register')}
          >
            Set Up Exam Alerts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingExamsSection;