import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'
import { useLoginContext } from '../context/LoginContext';

const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setShowLogin } = useLoginContext();
  const { setToken, fetchUser } = useAppContext();
  const navigate = useNavigate();

  const submitHandle = async(e)=>{
    e.preventDefault()
    const {data}=await axios.post(`/api/user/${state}`,{name,email,password})
    if(data.success){
      setToken(data.token)
      localStorage.setItem('token',data.token)
      axios.defaults.headers.common['Authorization'] = data.token; // <-- Add this line
      await fetchUser();
      setShowLogin(false)
      toast.success(data.message)
      navigate('/')   
    }else{
      toast.error(data.message)
    }
  }

  return (
    <div onClick={()=>setShowLogin(false)} className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={submitHandle} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[400px] rounded-lg shadow-2xl border border-gray-200 bg-white">
        <p className="text-2xl font-bold m-auto text-indigo-600 mb-2">
          <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p className="mb-1 text-gray-700">Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Type your name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500 focus:ring-2 focus:ring-indigo-200" type="text" required />
          </div>
        )}
        <div className="w-full ">
          <p className="mb-1 text-gray-700">Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Type your email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500 focus:ring-2 focus:ring-indigo-200" type="email" required />
        </div>
        <div className="w-full ">
          <p className="mb-1 text-gray-700">Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Type your password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500 focus:ring-2 focus:ring-indigo-200" type="password" required />
        </div>
        {state === "register" ? (
          <p className="text-sm">
            Already have an account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">Click here</span>
          </p>
        ) : (
          <p className="text-sm">
            Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">Click here</span>
          </p>
        )}
        <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer font-semibold text-lg mt-2">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login