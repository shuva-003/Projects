import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import ShowMovies from './components/ShowMovies';
import SearchMovie from './components/SearchMovie';
import Home from './components/Home';

const App = () => {
  const appStyles = {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Router>
      <div style={appStyles}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show-movies" element={<ShowMovies />} />
          <Route
            path="/search-movie"
            element={<SearchMovie />} // Pass setMovie if needed
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;























