import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Footer: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (router.pathname !== href) {
      router.push(href);
    }
  };

  return (
    <footer className="border-t bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">UPSCMonk</h3>
            <p className="text-sm text-gray-600">Your AI-powered UPSC companion with 50,000+ aspirants</p>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Resources</h4>
            <FooterLink href="#" onClick={() => handleNavigation('/study-materials')}>Study Materials</FooterLink>
            <FooterLink href="#" onClick={() => handleNavigation('/current-affairs')}>Current Affairs</FooterLink>
            <FooterLink href="#" onClick={() => handleNavigation('/mock-tests')}>Mock Tests</FooterLink>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <FooterLink href="#" onClick={() => handleNavigation('/terms')}>Terms</FooterLink>
            <FooterLink href="#" onClick={() => handleNavigation('/privacy')}>Privacy</FooterLink>
            <FooterLink href="#" onClick={() => handleNavigation('/refund')}>Refund</FooterLink>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex gap-4">
              <FaFacebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              <FaTwitter className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              <FaInstagram className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              <FaYoutube className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            </div>
            <input
              type="email"
              placeholder="Get exam updates"
              className="w-full mt-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          © 2024 UPSCMonk. Not affiliated with UPSC
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
  <Link href={href} onClick={onClick} className="block text-sm text-gray-600 hover:text-blue-600">
    {children}
  </Link>
);

export default Footer;