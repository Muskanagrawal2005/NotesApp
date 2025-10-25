import React from 'react';
import { useTheme } from '../context/ThemeContext';
import About from './About.jsx'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen flex flex-col items-center overflow-x-hidden ${
        theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
      }`}
    >
      {/* Hero Section */}
      <section
        className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 max-w-2xl mx-auto"
      >
        <h1
          className={`text-5xl font-extrabold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}
        >
          Welcome to{' '}
          <span
            className={`${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}
          >
            NotesHub
          </span>
        </h1>
        <p
          className={`text-lg mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Capture your thoughts, ideas, and reminders effortlessly.
          Stay organized and access your notes anytime, anywhere.
        </p>
        <button
          className={`px-6 py-3 rounded-xl transition-all ${
            theme === 'dark'
              ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-none'
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
          }`}
          onClick={() => navigate('/my-notes')}
        >
          View My Notes
        </button>
      </section>

      {/* About Section */}
      <About/>
    </div>
  );
};

export default Home;
