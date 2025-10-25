import React from 'react';
import { menuLinks } from '../assets/assets';
import { useLoginContext } from '../context/LoginContext';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { setShowLogin } = useLoginContext();
  const { user: backendUser, logout: backendLogout } = useAppContext();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    backendLogout();
  };

  const navLinkStyle = {
    color: theme === 'dark' ? '#f5f5f5' : '#374151',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 px-6 py-4 flex justify-between items-center shadow-md ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100 border-b border-gray-700'
          : 'bg-white text-gray-800 border-b border-gray-200'
      }`}
    >
      {/* Left Side - Menu Links */}
      <ul className="flex items-center space-x-6">
        {menuLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              style={navLinkStyle}
              className={({ isActive }) =>
                `duration-200 font-medium ${
                  isActive
                    ? 'text-indigo-600 underline underline-offset-4'
                    : 'hover:text-indigo-500'
                }`
              }
              to={link.path}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Side - User Info, Theme Toggle, Login/Logout */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`px-3 py-2 rounded transition-all ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {/* Login / Logout */}
        <button
          className={`px-4 py-2 rounded transition-all ${
            theme === 'dark'
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
          onClick={() => {
            if (backendUser) {
              handleLogout();
            } else {
              setShowLogin(true);
            }
          }}
        >
          {backendUser ? 'Logout' : 'Login'}
        </button>

        {/* User Name (Top Right) */}
        {backendUser && (
          <div
            className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Welcome, {backendUser.name}!
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
