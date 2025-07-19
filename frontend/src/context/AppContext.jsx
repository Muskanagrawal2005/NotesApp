import { createContext, useState,useContext } from "react";
import axios from "axios"
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();
export const AppProvider = ({ children }) => {

    const navigate=useNavigate();
    const[token,setToken]=useState(null);
    const[user,setUser]=useState(null);

    //Function to check if user is loggedin
    const fetchUser=async()=>{
        try {
            const {data}=await axios.get('/api/user/data')
            if(data.success){
                setUser(data.user)
            }else{
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout=()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        axios.defaults.headers.common['Authorization']='';
        toast.success('Logged out successfully')
        navigate('/')
    }

    //useEffect to retrieve tocken from localstorage

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        setToken(token);
      }
    }, []);

    //useEffect to detch user data when token is available

    useEffect(() => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        fetchUser();
      }
    }, [token]);
    
    const value = {
        navigate,
        axios,user,setUser,token,setToken,fetchUser,logout
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}