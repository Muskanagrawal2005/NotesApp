import express from 'express';
import  {createNote}  from '../controllers/noteController.js';
import { protect } from "../middleware/auth.js";
import Note from '../models/Note.js';

const noteRouter =express.Router();

noteRouter.post('/notes',protect,createNote)

noteRouter.get('/notes/mine', protect, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json({ success: true, notes });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update a note
noteRouter.put('/notes/:id', protect, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { heading: req.body.heading, content: req.body.content },
      { new: true }
    );
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    res.json({ success: true, note });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete a note
noteRouter.delete('/notes/:id', protect, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    res.json({ success: true, message: 'Note deleted' });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default noteRouter

