import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to NotesApp!</h1>
      <p className="text-lg mb-8 text-center max-w-xl">Organize your thoughts, save your ideas, and access your notes anywhere. Click below to view your personal notes.</p>
      <button
        className="px-6 py-3 rounded-lg shadow text-lg font-semibold transition"
        onClick={() => navigate('/my-notes')}
        style={{ background: '#6366f1', color: '#fff' }}
      >
        View My Notes
      </button>
    </div>
  )
}

export default Home