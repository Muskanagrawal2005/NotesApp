// App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Add from './pages/Add';
import Login from './pages/Login';
import { LoginContext } from './context/LoginContext';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import MyNotes from './pages/MyNotes';
import { ThemeProvider } from './context/ThemeContext';
import About from './pages/About';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <ThemeProvider>
      <div className="app-root w-full min-h-screen overflow-x-hidden transition-all duration-300">

        <Toaster />
        <LoginContext.Provider value={{ showLogin, setShowLogin }}>
          {showLogin && <Login setShowLogin={setShowLogin} />}
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="about" element={
                  <About />
              } />
              <Route path="add" element={
                <PrivateRoute>
                  <Add />
                </PrivateRoute>
              } />
              <Route path="my-notes" element={
                <PrivateRoute>
                  <MyNotes />
                </PrivateRoute>
              } />

            </Route>
          </Routes>
        </LoginContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
