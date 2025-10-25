import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../context/ThemeContext';

const MyNotes = () => {
  const { axios } = useAppContext();
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editHeading, setEditHeading] = useState('');
  const [editContent, setEditContent] = useState('');
  const [search, setSearch] = useState('');
  const { theme } = useTheme();

  const fetchNotes = async () => {
    const { data } = await axios.get('/api/notes/mine');
    if (data.success) setNotes(data.notes);
  };

  useEffect(() => { fetchNotes(); }, [axios]);

  const handleDelete = async (id) => {
    await axios.delete(`/api/notes/${id}`);
    fetchNotes();
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditHeading(note.heading);
    setEditContent(note.content);
  };

  const handleUpdate = async (id) => {
    await axios.put(`/api/notes/${id}`, { heading: editHeading, content: editContent });
    setEditingId(null);
    fetchNotes();
  };

  // Filter notes by heading
  const filteredNotes = notes.filter(note =>
    note.heading.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className={`text-2xl font-bold mb-6 ${
        theme === 'dark' ? 'text-gray-100' : 'text-indigo-700'
      }`}>My Notes</h2>
      <input
        type="text"
        placeholder="Search by heading..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={`mb-6 p-2 border rounded w-full focus:outline-none focus:ring-2 ${
          theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-gray-500'
            : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-200'
        }`}
      />
      {filteredNotes.length === 0 ? (
        <p className={`${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>No notes found.</p>
      ) : (
        <ul className="space-y-6">
          {filteredNotes.map(note => (
            <li key={note._id} className={`p-5 rounded-lg flex flex-col gap-2 ${
              theme === 'dark'
                ? 'bg-gray-800 shadow-none text-gray-100'
                : 'bg-white shadow text-gray-900'
            }`}>
              {editingId === note._id ? (
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      value={editHeading}
                      onChange={e => setEditHeading(e.target.value)}
                      className={`border rounded px-3 py-1 text-lg focus:outline-none focus:ring-2 ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-200'
                      }`}
                    />
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      rows={4}
                      className={`border rounded px-3 py-1 text-lg focus:outline-none focus:ring-2 h-20 ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-200'
                      }`}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleUpdate(note._id)} className={`px-4 py-1 rounded font-semibold ${
                        theme === 'dark'
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}>Save</button>
                      <button onClick={() => setEditingId(null)} className={`px-4 py-1 rounded font-semibold ${
                        theme === 'dark'
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                      }`}>Cancel</button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-md font-semibold mb-2 ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>Preview:</h4>
                    <div className={`prose max-w-none p-3 rounded h-64 overflow-y-auto ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-gray-50 text-gray-900'
                    }`}>
                      <ReactMarkdown>{editContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <strong className={`text-lg ${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'
                    }`}>{note.heading}</strong>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(note)} className={`px-3 py-1 rounded font-semibold ${
                        theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}>Edit</button>
                      <button onClick={() => handleDelete(note._id)} className={`px-3 py-1 rounded font-semibold ${
                        theme === 'dark'
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}>Delete</button>
                    </div>
                  </div>
                  <div className={`prose max-w-none p-3 rounded ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-50 text-gray-900'
                  }`}>
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </div>
                  <div className={`text-xs mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Last updated: {new Date(note.updatedAt).toLocaleString()}</div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyNotes;
