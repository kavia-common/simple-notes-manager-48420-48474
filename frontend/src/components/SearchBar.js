import React, { useId } from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBar for filtering notes by title/content.
 * Props:
 * - value: string
 * - onChange: (string) => void
 */
function SearchBar({ value, onChange }) {
  const id = useId();
  return (
    <div className="searchbar">
      <label htmlFor={`search-${id}`} className="sr-only">
        Search notes
      </label>
      <input
        id={`search-${id}`}
        type="search"
        className="input"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search notes"
      />
    </div>
  );
}

export default SearchBar;
