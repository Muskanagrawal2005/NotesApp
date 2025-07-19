import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useLoginContext } from "../context/LoginContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAppContext();
  const { setShowLogin } = useLoginContext();
  // If user is not logged in, redirect to home (or login)
  useEffect(()=>{
    if (!user) {
        // return <Navigate to="/" replace />;
        setShowLogin(true);
      }
  },[user,setShowLogin])
  // If user is logged in, show the protected page
  if (!user) {
    // Don't render the protected page if not logged in
    return null;
  }
  return children;
};

export default PrivateRoute;