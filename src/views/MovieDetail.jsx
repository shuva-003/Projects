import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../services/movieService';

const MovieDetail = ({ movieId, onBack }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await fetchMovieDetails(movieId);
      setMovie(details);
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <button onClick={onBack}>Back</button>
      <h2>{movie.title}</h2>
      <img src={movie.image} alt={movie.title} />
      <p>{movie.plot}</p>
      <p>Rating: {movie.imDbRating}</p>
    </div>
  );
};

export default MovieDetail;
