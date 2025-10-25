import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const Add = () => {
  const [input, setInput] = useState("hello");
  const [heading, setHeading] = useState('');
  const { axios } = useAppContext ? useAppContext() : { axios: null };
  const { theme } = useTheme();

  const submitNote = async (e) => {
    e.preventDefault();
    console.log("submitNote called");
    const token = localStorage.getItem('token');
    if (axios) {
      await axios.post('/api/notes', { heading, content: input }, {
        headers: {
          'Authorization': token
        }
      });
      setInput("");
      setHeading("");
    } else {
      // fallback if axios from context is not available
      const axiosLib = await import('axios');
      await axiosLib.default.post('/api/notes', { heading, content: input }, {
        headers: {
          'Authorization': token
        }
      });
    }
  }
  return (
    <div className={`w-full rounded-lg p-8 mt-8 ${
      theme === 'dark'
        ? 'bg-gray-800 shadow-none text-gray-100'
        : 'bg-white shadow-lg text-gray-300'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        theme === 'dark' ? 'text-gray-100' : 'text-gray-300'
      }`}>Add a New Note</h2>
      <div className="flex gap-8">
        <form onSubmit={submitNote} onClick={(e) => e.stopPropagation()} className="flex-1 flex flex-col gap-4">
          <input
            type='text'
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Heading"
            className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 text-lg ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-gray-500'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-200'
            }`}
          />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your note in markdown..."
            rows={4}
            className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 text-lg h-24 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-gray-500'
                : 'bg-white border-gray-300 text-gray-400 focus:ring-indigo-200'
            }`}
          ></textarea>
          <button type='submit' className={`rounded px-6 py-2 font-semibold text-lg transition ${
            theme === 'dark'
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-none'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow'
          }`}>Submit</button>
        </form>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>Preview:</h3>
          <div className={`prose max-w-none p-4 rounded h-96 overflow-y-auto ${
            theme === 'dark'
              ? 'bg-gray-700 text-gray-100'
              : 'bg-gray-50 text-gray-900'
          }`}>
            <ReactMarkdown>{input}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add