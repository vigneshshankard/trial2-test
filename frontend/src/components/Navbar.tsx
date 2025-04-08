import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBolt } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (router.pathname !== href) {
      router.push(href);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <FaBolt className="w-6 h-6 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">UPSCMonk</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="#" onClick={() => handleNavigation('/study-materials')}>Study Materials</NavLink>
          <NavLink href="#" onClick={() => handleNavigation('/current-affairs')}>Current Affairs</NavLink>
          <NavLink href="#" onClick={() => handleNavigation('/mock-tests')}>Mock Tests</NavLink>
          <NavLink href="#" onClick={() => handleNavigation('/community')}>Community</NavLink>
          <NavLink href="#" onClick={() => handleNavigation('/blog')}>Blog</NavLink>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
            Sign Up <MdArrowForward className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-blue-600"
          >
            {isMobileMenuOpen ? <IoMdClose className="w-6 h-6" /> : <GiHamburgerMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md">
          <div className="flex flex-col gap-4 p-4">
            <NavLink href="/" onClick={() => handleNavigation('/')}>Home</NavLink>
            <NavLink href="#" onClick={() => handleNavigation('/study-materials')}>Study Materials</NavLink>
            <NavLink href="#" onClick={() => handleNavigation('/current-affairs')}>Current Affairs</NavLink>
            <NavLink href="#" onClick={() => handleNavigation('/mock-tests')}>Mock Tests</NavLink>
            <NavLink href="#" onClick={() => handleNavigation('/community')}>Community</NavLink>
            <NavLink href="#" onClick={() => handleNavigation('/blog')}>Blog</NavLink>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
              Sign Up <MdArrowForward className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
  <Link href={href} className="text-gray-600 hover:text-blue-600 px-3 py-2 transition-colors" onClick={onClick}>
    {children}
  </Link>
);

export default Navbar;