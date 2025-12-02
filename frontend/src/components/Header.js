import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header component for the Simple Notes Manager.
 */
function Header() {
  return (
    <header className="ocean-header">
      <div className="container header-inner">
        <h1 className="app-title" aria-label="Simple Notes Manager">
          Simple Notes Manager
        </h1>
        <div className="brand-accent" aria-hidden="true" />
      </div>
    </header>
  );
}

export default Header;
