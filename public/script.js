const form = document.getElementById('noteForm');
const notesContainer = document.getElementById('notesContainer');

const loadNotes = async () => {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;
    notesContainer.appendChild(div);
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  form.reset();
  loadNotes();
});

const deleteNote = async (id) => {
  await fetch(`/api/notes/${id}`, { method: 'DELETE' });
  loadNotes();
};

// Load notes on page load
loadNotes();
