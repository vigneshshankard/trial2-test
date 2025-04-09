import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle, XCircle, Clock, ArrowRight, Award, BarChart } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

// Mock data for a sample question
const sampleQuestions = [
  {
    id: 1,
    question: 'Which of the following is NOT a fundamental right guaranteed by the Indian Constitution?',
    options: [
      'Right to Equality',
      'Right to Freedom',
      'Right to Property',
      'Right to Freedom of Religion',
    ],
    correctAnswer: 2, // index of correct option
    explanation: 'Right to Property was originally a fundamental right but was removed from the list of Fundamental Rights by the 44th Amendment Act, 1978. It is now a legal right under Article 300A.',
  },
  {
    id: 2,
    question: 'Which committee recommended the establishment of a three-tier Panchayati Raj system in India?',
    options: [
      'Balwant Rai Mehta Committee',
      'Ashok Mehta Committee',
      'G.V.K. Rao Committee',
      'L.M. Singhvi Committee',
    ],
    correctAnswer: 0,
    explanation: 'The Balwant Rai Mehta Committee (1957) recommended the establishment of a three-tier Panchayati Raj system - Gram Panchayat at village level, Panchayat Samiti at block level, and Zila Parishad at district level.',
  },
  {
    id: 3,
    question: 'Which of the following gases contributes most to the greenhouse effect on Earth?',
    options: [
      'Carbon Dioxide',
      'Methane',
      'Water Vapor',
      'Ozone',
    ],
    correctAnswer: 2,
    explanation: 'Water vapor accounts for about 60-70% of the greenhouse effect, while carbon dioxide accounts for about 20-25%. However, human activities primarily increase CO2, not water vapor.',
  },
];

const MockTestPreviewSection: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(45); // seconds for demo
  const currentQuestion = sampleQuestions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return;
    setSelectedOption(optionIndex);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    setShowResult(true);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Redirect to registration or mock test full page
      router.push('/register?ref=mock-test');
    }
  };
  
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Experience Our Mock Tests</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Practice with sample questions designed to simulate the UPSC exam environment. 
            Test your knowledge and see how our detailed explanations can help you improve.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mock Test Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border border-neutral-100">
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Sample UPSC Question</h3>
                  <p className="text-sm text-neutral-500">
                    Question {currentQuestionIndex + 1} of {sampleQuestions.length}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-neutral-100 py-1 px-3 rounded-full text-neutral-700">
                  <Clock size={16} />
                  <span className="font-medium">{timer}s</span>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>
                
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <div 
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedOption === index 
                          ? showResult
                            ? index === currentQuestion.correctAnswer
                              ? 'bg-success-50 border-success'
                              : 'bg-error-50 border-error'
                            : 'bg-primary-50 border-primary'
                          : 'border-neutral-200 hover:border-primary hover:bg-primary-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          selectedOption === index
                            ? showResult
                              ? index === currentQuestion.correctAnswer
                                ? 'bg-success text-white'
                                : 'bg-error text-white'
                              : 'bg-primary text-white'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {showResult && index === currentQuestion.correctAnswer && (
                          <CheckCircle size={20} className="text-success ml-2" />
                        )}
                        {showResult && selectedOption === index && selectedOption !== currentQuestion.correctAnswer && (
                          <XCircle size={20} className="text-error ml-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {showResult && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    isCorrect ? 'bg-success-50' : 'bg-error-50'
                  }`}>
                    <h4 className={`font-medium flex items-center ${
                      isCorrect ? 'text-success' : 'text-error'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle size={18} className="mr-2" />
                          Correct Answer!
                        </>
                      ) : (
                        <>
                          <XCircle size={18} className="mr-2" />
                          Incorrect Answer
                        </>
                      )}
                    </h4>
                    <p className="mt-2 text-neutral-700">{currentQuestion.explanation}</p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  {!showResult ? (
                    <Button 
                      variant="primary"
                      disabled={selectedOption === null}
                      onClick={handleSubmit}
                      fullWidth
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary"
                      onClick={handleNext}
                      rightIcon={<ArrowRight size={16} />}
                      fullWidth
                    >
                      {currentQuestionIndex < sampleQuestions.length - 1 
                        ? 'Next Question' 
                        : 'View Full Mock Test'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card variant="feature">
              <div className="p-6">
                <h3 className="font-medium mb-4">Why Our Mock Tests?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-secondary-100">
                      <BarChart size={16} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Detailed Analytics</h4>
                      <p className="text-sm text-neutral-600">
                        Track your performance across subjects and topics
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-primary-100">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Timed Environment</h4>
                      <p className="text-sm text-neutral-600">
                        Practice with real exam timing conditions
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-accent-100">
                      <Award size={16} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">UPSC Pattern</h4>
                      <p className="text-sm text-neutral-600">
                        Questions designed by UPSC experts and toppers
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8 pt-4 border-t border-neutral-100">
                  <p className="text-sm text-neutral-600 mb-4">
                    Access over 10,000 practice questions and 100+ full-length mock tests
                  </p>
                  <Button 
                    variant="accent" 
                    rightIcon={<ArrowRight size={16} />}
                    fullWidth
                    onClick={() => router.push('/mock-tests')}
                  >
                    Explore Mock Tests
                  </Button>
                </div>
              </div>
            </Card>
            
            <div className="bg-neutral-100 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary text-sm font-bold">
                  TIP
                </div>
                <h4 className="font-medium">Study Tip</h4>
              </div>
              <p className="text-sm text-neutral-600">
                Regular mock tests help identify knowledge gaps and improve time management skills - two crucial factors for UPSC success.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => router.push('/register')}
          >
            Sign Up For Free Access
          </Button>
          <p className="mt-3 text-sm text-neutral-500">
            Get access to 10 free mock tests when you register
          </p>
        </div>
      </div>
    </section>
  );
};

export default MockTestPreviewSection;