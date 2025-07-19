import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useAppContext } from '../context/AppContext';

const Add = () => {
  const [input, setInput] = useState("hello");
  const [heading, setHeading] = useState('');
  const { axios } = useAppContext ? useAppContext() : { axios: null };

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
    <div className="max-w-xl mx-auto rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Add a New Note</h2>
      <form onSubmit={submitNote} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4">
        <input
          type='text'
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Heading"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 text-lg"
        />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your note in markdown..."
          rows={6}
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 text-lg"
        ></textarea>
        <button type='submit' className="rounded px-6 py-2 font-semibold text-lg shadow transition" style={{ background: '#6366f1', color: '#fff' }}>Submit</button>
      </form>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
        <div className="prose max-w-none p-4 rounded">
          <ReactMarkdown>{input}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Add