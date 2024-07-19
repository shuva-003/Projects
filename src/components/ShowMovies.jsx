import React, { useState, useEffect } from 'react';

const ShowMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      margin: 'auto',
      textAlign: 'center',
      maxWidth: '800px',
      minHeight: '100vh',
      marginTop: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor:'#005C78',
    },
    header: {
      fontSize: '2em',
      color: '#7B113A',
      marginBottom: '20px',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      width: '100%',
    },
    listItem: {
      padding: '10px 20px',
      color: '#A0153E',
      fontWeight: 'bold',
      borderBottom: '1px solid #ccc',
      backgroundColor: '#B3E2A7',
      margin: '10px 0',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    loading: {
      fontSize: '1.5em',
    },
    error: {
      color: 'red',
      fontSize: '1.2em',
    },
  };

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.error}>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Top 100 Movies</h1>
      <ul style={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id} style={styles.listItem}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowMovies;


