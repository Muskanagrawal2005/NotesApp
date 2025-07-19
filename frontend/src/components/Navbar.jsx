import React from 'react'
import { menuLinks } from '../assets/assets'
import { useLoginContext } from '../context/LoginContext';
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {

  const { setShowLogin } = useLoginContext();
  const { user: backendUser, logout: backendLogout } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  
  // console.log("Backend user:", backendUser);

  const handleLogout = () => {
    // Logout from both Auth0 and backend
    backendLogout();
  };

  // Define link color based on theme
  const navLinkStyle = {
    color: theme === 'dark' ? '#f5f5f5' : '#222',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  return (
    <div className='pt-4'>

      <div>
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          {menuLinks.map((link, index) => (
            <li key={index} >
              <NavLink
                style={navLinkStyle}
                className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-grey"}`}
                to={link.path}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          <li>
            <button
              className="px-4 py-2 rounded"
              style={{ background: '#6366f1', color: '#fff' }}
              onClick={() => {
                if (backendUser) {
                  handleLogout();
                } else {
                  setShowLogin(true);
                }
              }}
            >
              {backendUser ? "Logout" : "Login"}
            </button>
          </li>
          {/* Theme toggle button */}
          <li>
            <button
              onClick={toggleTheme}
              className="ml-4 px-3 py-2 rounded theme-toggle-btn"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </li>
        </ul>
        {/* Display user info if logged in */}
        {backendUser && (
          <div className="mt-2 text-sm">
            Welcome, {backendUser.name}!
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar