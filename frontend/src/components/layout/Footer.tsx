import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import Button from '../ui/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">UPSCMONK</h3>
            <p className="text-neutral-300 text-sm mb-6">
              India's premier platform for UPSC exam preparation, offering comprehensive study materials, 
              mock tests, and personalized learning plans.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-neutral-300 hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-neutral-300 hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-neutral-300 hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-neutral-300 hover:text-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wide mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/study-materials" className="text-neutral-300 hover:text-white transition-colors">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link href="/current-affairs" className="text-neutral-300 hover:text-white transition-colors">
                  Current Affairs
                </Link>
              </li>
              <li>
                <Link href="/mock-tests" className="text-neutral-300 hover:text-white transition-colors">
                  Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/exams" className="text-neutral-300 hover:text-white transition-colors">
                  Exam Notifications
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-neutral-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Support */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wide mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-neutral-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-300 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wide mb-4 text-sm">Contact Us</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <Mail size={16} className="text-accent mt-1 mr-3 flex-shrink-0" />
                <span className="text-neutral-300 text-sm">support@upscmonk.com</span>
              </div>
              <div className="flex items-start">
                <Phone size={16} className="text-accent mt-1 mr-3 flex-shrink-0" />
                <span className="text-neutral-300 text-sm">+91 9876543210</span>
              </div>
            </div>
            
            <h4 className="text-white font-bold uppercase tracking-wide mb-3 text-sm">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-primary-800 text-white text-sm placeholder:text-neutral-400 px-3 py-2 rounded-l-md focus:outline-none flex-1 min-w-0"
              />
              <Button 
                variant="accent"
                className="rounded-l-none"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-800 text-center md:flex md:justify-between md:items-center text-sm">
          <div className="text-neutral-400 mb-2 md:mb-0">
            © {currentYear} UPSCMONK. All rights reserved.
          </div>
          <div className="flex justify-center space-x-4">
            <Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;