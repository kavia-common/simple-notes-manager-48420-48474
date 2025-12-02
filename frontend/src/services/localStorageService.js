const STORAGE_KEY = 'snm_notes_v1';

/**
 * PUBLIC_INTERFACE
 * LocalStorageService implements basic CRUD with localStorage persistence.
 */
const LocalStorageService = {
  async list() {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  async create({ title, content }) {
    const now = Date.now();
    const note = {
      id: `${now}-${Math.random().toString(36).slice(2)}`,
      title,
      content: content || '',
      createdAt: now,
      updatedAt: now,
    };
    const all = await this.list();
    const next = [note, ...all];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return note;
  },

  async update(id, { title, content }) {
    const all = await this.list();
    const next = all.map((n) =>
      n.id === id ? { ...n, title, content: content || '', updatedAt: Date.now() } : n
    );
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next.find((n) => n.id === id);
  },

  async remove(id) {
    const all = await this.list();
    const next = all.filter((n) => n.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return true;
  },
};

export default LocalStorageService;
