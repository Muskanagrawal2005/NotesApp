import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useTheme } from './context/ThemeContext';

const Layout = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen font-sans ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'
    }`}>
      <Navbar />
      <main className="max-w-2xl mx-auto p-4 mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
