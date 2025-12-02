import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteForm supports create and update. Title is required, content optional.
 * Props:
 * - onSubmit({ title, content }): Promise|void
 * - initialData: {id, title, content} | null
 * - onCancel: optional function to cancel editing
 */
function NoteForm({ onSubmit, initialData = null, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => {
    // focus title on mount
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('Title is required.');
      if (titleRef.current) titleRef.current.focus();
      return;
    }
    await Promise.resolve(onSubmit({ title: title.trim(), content }));
    setTitle('');
    setContent('');
  };

  const formId = initialData ? `edit-form-${initialData.id}` : 'create-form';

  return (
    <form id={formId} className="note-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor={`${formId}-title`} className="form-label">
          Title
        </label>
        <input
          id={`${formId}-title`}
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          placeholder="Meeting notes, ideas, todos..."
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
        />
      </div>
      <div className="form-row">
        <label htmlFor={`${formId}-content`} className="form-label">
          Content
        </label>
        <textarea
          id={`${formId}-content`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea"
          placeholder="Add details (optional)"
          rows={4}
        />
      </div>
      {error ? (
        <div className="form-error" role="alert" aria-live="assertive">
          {error}
        </div>
      ) : null}
      <div className="form-actions">
        <button type="submit" className="btn primary" aria-label={initialData ? 'Update note' : 'Create note'}>
          {initialData ? 'Update Note' : 'Add Note'}
        </button>
        {onCancel ? (
          <button
            type="button"
            className="btn ghost"
            onClick={onCancel}
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default NoteForm;
