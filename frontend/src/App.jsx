// App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Add from './pages/Add';
// import Freelance from './pages/Freelance';
import Login from './pages/Login';
import { LoginContext } from './context/LoginContext';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
// import EmailVerify from './components/EmailVerify';
import MyNotes from './pages/MyNotes';
// import { useTheme } from './context/ThemeContext';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  // const { theme } = useTheme();

  return (
    <div className="app-root">
      <Toaster />
      <LoginContext.Provider value={{ showLogin, setShowLogin }}>
        {showLogin && <Login setShowLogin={setShowLogin} />}
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
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
            {/* <Route path="freelance" element={<Freelance />} /> */}
            {/* <Route path="/user/:id/verify/:token" element={<EmailVerify />} /> */}
          </Route>
        </Routes>
      </LoginContext.Provider>
    </div>
  );
};

export default App;
