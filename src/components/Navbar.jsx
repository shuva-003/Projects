import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#2F3645' : '#fff';
    document.body.style.color = darkMode ? '#fff' : '#000';
  }, [darkMode]);

  const navStyles = {
    width: '98%',
    padding: '20px',
    backgroundColor: darkMode ? '#2F3645' : '#fff',
    color: darkMode ? 'white' : '#000',
    border: "1px solid blue",
    borderRadius: "10px",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const linkStyles = {
    margin: '0 15px',
    textDecoration: 'none',
    color: darkMode ? '#80C4E9' : '#000',
    fontSize: '18px',
  };

  const buttonStyles = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: darkMode ? '#555' : '#ddd',
    color: darkMode ? 'white' : '#000',
    border: 'none',
    cursor: 'pointer',
    borderRadius: "7px",
  };

  return (
    <nav style={navStyles}>
      <div>
        <Link to="/" style={linkStyles}>Home</Link>
        <Link to="/show-movies" style={linkStyles}>Movies Name</Link>
        <Link to="/search-movie" style={linkStyles}>Search Movie</Link>
      </div>
      <button onClick={toggleTheme} style={buttonStyles}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default NavBar;


