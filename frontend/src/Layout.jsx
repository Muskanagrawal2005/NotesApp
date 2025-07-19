import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="max-w-2xl mx-auto p-4 mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
