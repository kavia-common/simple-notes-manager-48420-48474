const BASE = process.env.REACT_APP_API_BASE;

/**
 * PUBLIC_INTERFACE
 * ApiService implements CRUD against a backend. It assumes a REST style:
 * GET    /notes
 * POST   /notes        body: {title, content}
 * PUT    /notes/:id    body: {title, content}
 * DELETE /notes/:id
 * Health check: GET `${BASE}` expected 200 OK.
 * If BASE is not set or health fails, consumers should fallback to local storage.
 */
const ApiService = {
  base: BASE,

  async health() {
    if (!this.base) return false;
    try {
      const res = await fetch(this.base, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  async list() {
    const res = await fetch(`${this.base}/notes`, { method: 'GET' });
    if (!res.ok) throw new Error('Failed to fetch notes');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },

  async create({ title, content }) {
    const res = await fetch(`${this.base}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw new Error('Failed to create note');
    return res.json();
  },

  async update(id, { title, content }) {
    const res = await fetch(`${this.base}/notes/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw new Error('Failed to update note');
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${this.base}/notes/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete note');
    return true;
  },
};

export default ApiService;
