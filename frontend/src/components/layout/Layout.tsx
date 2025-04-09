import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  userRole?: 'visitor' | 'free' | 'premium' | 'admin';
};

const Layout: React.FC<LayoutProps> = ({ children, userRole = 'visitor' }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={userRole} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;