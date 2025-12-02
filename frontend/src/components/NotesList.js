import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NotesList renders list of notes with edit and delete actions.
 * Props:
 * - notes: array of {id, title, content, updatedAt}
 * - onEdit(note)
 * - onDelete(id)
 */
function NotesList({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return <p className="muted">No notes yet. Create one above.</p>;
  }

  return (
    <ul className="notes-list" role="list" aria-label="Notes">
      {notes.map((n) => (
        <li key={n.id} className="note-item surface">
          <div className="note-head">
            <h3 className="note-title">{n.title}</h3>
            <div className="note-actions">
              <button
                className="icon-btn"
                onClick={() => onEdit(n)}
                aria-label={`Edit note titled ${n.title}`}
                title="Edit"
              >
                ✏️
              </button>
              <button
                className="icon-btn danger"
                onClick={() => onDelete(n.id)}
                aria-label={`Delete note titled ${n.title}`}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
          {n.content ? <p className="note-content">{n.content}</p> : null}
          <div className="note-meta">
            <span className="muted">Last updated: {new Date(n.updatedAt || 0).toLocaleString()}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NotesList;
