import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';

const MyNotes = () => {
  const { axios } = useAppContext();
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editHeading, setEditHeading] = useState('');
  const [editContent, setEditContent] = useState('');
  const [search, setSearch] = useState('');

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
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">My Notes</h2>
      <input
        type="text"
        placeholder="Search by heading..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      {filteredNotes.length === 0 ? (
        <p className="text-gray-500">No notes found.</p>
      ) : (
        <ul className="space-y-6">
          {filteredNotes.map(note => (
            <li key={note._id} className="bg-white p-5 rounded-lg shadow flex flex-col gap-2">
              {editingId === note._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={editHeading}
                    onChange={e => setEditHeading(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleUpdate(note._id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded font-semibold">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-300 px-4 py-1 rounded font-semibold">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <strong className="text-lg text-indigo-700">{note.heading}</strong>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(note)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold">Edit</button>
                      <button onClick={() => handleDelete(note._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold">Delete</button>
                    </div>
                  </div>
                  <div className="prose max-w-none bg-gray-50 p-3 rounded">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Last updated: {new Date(note.updatedAt).toLocaleString()}</div>
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
