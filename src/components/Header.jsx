import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header>
      <div className="container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo">ZapRecall</div>
        </Link>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header; 