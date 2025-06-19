const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let notes = []; // In-memory notes. You can read/write from notes.json instead

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Add a note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: Date.now(), title, content };
  notes.push(newNote);
  res.json({ message: 'Note added!', note: newNote });
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = Number(req.params.id);
  notes = notes.filter(note => note.id !== noteId);
  res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
