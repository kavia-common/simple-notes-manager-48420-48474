import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import SearchBar from './components/SearchBar';
import { useStorageSelector } from './services/storageSelector';
import { ThemeProvider } from './theme/ThemeContext';

/**
 * App shell for Simple Notes Manager with Ocean Professional theme.
 * Includes header, creation form, search, and notes list with edit/delete.
 */
function App() {
  const storage = useStorageSelector();
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  // Load notes on mount from selected storage (API or local)
  useEffect(() => {
    let isMounted = true;
    storage
      .list()
      .then((items) => {
        if (isMounted) setNotes(items);
      })
      .catch(() => {
        // Fallback already handled in selector; keep empty state if load fails
        setNotes([]);
      });
    return () => {
      isMounted = false;
    };
  }, [storage]);

  const filteredSortedNotes = useMemo(() => {
    const lower = query.trim().toLowerCase();
    const filtered = lower
      ? notes.filter(
          (n) =>
            (n.title || '').toLowerCase().includes(lower) ||
            (n.content || '').toLowerCase().includes(lower)
        )
      : notes.slice();
    return filtered.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }, [notes, query]);

  const handleCreate = async (payload) => {
    const newNote = await storage.create(payload);
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleUpdate = async (id, payload) => {
    const updated = await storage.update(id, payload);
    setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
    setEditingNote(null);
  };

  const handleDelete = async (id) => {
    // Confirm deletion with accessible dialog
    // eslint-disable-next-line no-alert
    const ok = window.confirm('Delete this note? This cannot be undone.');
    if (!ok) return;
    await storage.remove(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <ThemeProvider>
      <div className="ocean-app">
        <Header />
        <main className="ocean-main container">
          <section className="card surface">
            <h2 className="section-title">Create a Note</h2>
            <NoteForm
              key={editingNote ? `editing-${editingNote.id}` : 'new'}
              onSubmit={editingNote ? (data) => handleUpdate(editingNote.id, data) : handleCreate}
              initialData={editingNote || null}
              onCancel={editingNote ? () => setEditingNote(null) : undefined}
            />
          </section>

          <section className="card surface">
            <div className="list-header">
              <h2 className="section-title">Your Notes</h2>
              <SearchBar value={query} onChange={setQuery} />
            </div>
            <NotesList
              notes={filteredSortedNotes}
              onEdit={setEditingNote}
              onDelete={handleDelete}
            />
          </section>
        </main>
        <footer className="ocean-footer">
          <p className="muted">Simple Notes Manager • Ocean Professional Theme</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
