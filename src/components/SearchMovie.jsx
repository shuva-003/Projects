// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
// import ReactPaginate from 'react-paginate';

// const SearchMovie = ({ setMovie }) => {
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [moviesByGenre, setMoviesByGenre] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [allMovies, setAllMovies] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);

//   const moviesPerPage = 12; // Number of movies to display per page

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
//           method: 'GET',
//           headers: {
//             'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
//             'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setAllMovies(data);
//         setMoviesByGenre(data);
//       } catch (error) {
//         console.error('Fetch Error:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
//           method: 'GET',
//           headers: {
//             'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
//             'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         const genres = [...new Set(data.flatMap(movie => movie.genre))];
//         setGenres(genres);
//       } catch (error) {
//         console.error('Fetch Error:', error);
//         setError(error.message);
//       }
//     };

//     fetchGenres();
//   }, []);

//   const handleSearch = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
//         method: 'GET',
//         headers: {
//           'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
//           'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));

//       if (filteredMovies.length > 0) {
//         setMoviesByGenre(filteredMovies); // Set the movies to display in the list
//         setMovieDetails(null); // Clear the single movie detail view
//         setCurrentPage(0); // Reset to the first page of results
//       } else {
//         setError('No results found');
//         setMovie(null);
//         setMovieDetails(null);
//         setMoviesByGenre([]); // Clear movies by genre when no search result is found
//       }
//     } catch (error) {
//       console.error('Fetch Error:', error);
//       setError(error.message);
//       setMovie(null);
//       setMovieDetails(null);
//       setMoviesByGenre([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenreClick = async (genre) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`https://imdb-top-100-movies.p.rapidapi.com/`, {
//         method: 'GET',
//         headers: {
//           'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
//           'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       // Filter movies by genre
//       const filteredMovies = data.filter(movie => movie.genre.includes(genre));

//       setMoviesByGenre(filteredMovies); // Set the movies to display in the list
//       setMovieDetails(null); // Clear the single movie detail view
//       setCurrentPage(0); // Reset to the first page of results
//     } catch (error) {
//       console.error('Fetch Error:', error);
//       setError('Failed to fetch movies by genre. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5 ? 1 : 0;
//     const emptyStars = 10 - fullStars - halfStar;

//     const starArray = [];
//     for (let i = 0; i < fullStars; i++) {
//       starArray.push(<FontAwesomeIcon icon={faStar} key={`full-${i}`} style={{ color: '#FFD700' }} />);
//     }
//     if (halfStar === 1) {
//       starArray.push(<FontAwesomeIcon icon={faStarHalfAlt} key={`half`} style={{ color: '#FFD700' }} />);
//     }
//     for (let i = 0; i < emptyStars; i++) {
//       starArray.push(<FontAwesomeIcon icon={faStar} key={`empty-${i}`} style={{ color: '#ccc' }} />);
//     }

//     return (
//       <span>
//         {starArray} ({rating}/10)
//       </span>
//     );
//   };

//   const indexOfLastMovie = (currentPage + 1) * moviesPerPage;
//   const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
//   const currentMovies = moviesByGenre.slice(indexOfFirstMovie, indexOfLastMovie);

//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   const totalPages = Math.ceil(moviesByGenre.length / moviesPerPage);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '100vh' }}>
//       <h1 style={{ color: 'red' }}>Movie Recommendation App</h1>
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for a movie..."
//           style={{
//             padding: '10px',
//             marginRight: '10px',
//             fontSize: '16px',
//             width: '300px',
//             borderRadius: "10px"
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           disabled={loading}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             backgroundColor: '#007bff',
//             color: '#fff',
//             border: 'none',
//             cursor: 'pointer',
//             borderRadius: "7px"
//           }}
//         >
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         {genres.map((genre) => (
//           <button
//             key={genre}
//             onClick={() => handleGenreClick(genre)}
//             style={{
//               padding: '10px',
//               fontSize: '16px',
//               backgroundColor: '#102C57',
//               color: '#fff',
//               border: 'none',
//               margin: '5px',
//               cursor: 'pointer',
//               borderRadius: "6px"
//             }}
//           >
//             {genre}
//           </button>
//         ))}
//       </div>
//       {movieDetails && (
//         <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', maxWidth: '800px', textAlign: 'left', marginLeft: '20px', backgroundColor: 'black', color: 'white', borderRadius: "10px" }}>
//           <div style={{ marginRight: '20px', marginLeft: '20px' }}>
//             <h2>{movieDetails.title}</h2>
//             <p>{movieDetails.description}</p>
//             <p>Rating: {renderStars(movieDetails.rating)}</p>
//             <p>Year: {movieDetails.year}</p>
//           </div>
//           <div>
//             <img src={movieDetails.image} alt={movieDetails.title} style={{ borderRadius: '10px', maxWidth: '200px' }} />
//           </div>
//         </div>
//       )}
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
//         {currentMovies.map((movie, index) => (
//           <div
//             key={index}
//             style={{
//               width: '200px',
//               margin: '10px',
//               padding: '10px',
//               backgroundColor: 'black',
//               color: 'white',
//               textAlign: 'center',
//               borderRadius: '10px',
//             }}
//           >
//             <img src={movie.image} alt={movie.title} style={{ width: '50%', borderRadius: '10px' }} />
//             <h2 style={{ fontSize: '18px' }}>{movie.title}</h2>
//             <p>Rating: {renderStars(movie.rating)}</p>
//             <p>{movie.year}</p>
//           </div>
//         ))}
//       </div>
//       <div>
//         <ReactPaginate
//           previousLabel={'Previous'}
//           nextLabel={'Next'}
//           breakLabel={'...'}
//           breakClassName={'break-me'}
//           pageCount={totalPages}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={'pagination'}
//           subContainerClassName={'pages pagination'}
//           activeClassName={'active'}
//           pageClassName={'page-item'}
//           pageLinkClassName={'page-link'}
//           previousClassName={'page-item'}
//           previousLinkClassName={'page-link'}
//           nextClassName={'page-item'}
//           nextLinkClassName={'page-link'}
//           breakLinkClassName={'page-link'}
//         />
//       </div>
//       <style>{`
//         .pagination {
//           display: flex;
//           list-style: none;
//           padding: 0;
//           margin: 20px 0;
//         }

//         .page-item {
//           margin: 0 5px;
//         }

//         .page-link {
//           padding: 10px 15px;
//           border: 1px solid #ddd;
//           color: #007bff;
//           cursor: pointer;
//           border-radius: 5px;
//           text-decoration: none;
//         }

//         .page-link:hover {
//           background-color: #007bff;
//           color: white;
//         }

//         .active .page-link {
//           background-color: #007bff;
//           color: white;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SearchMovie;
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import Autosuggest from 'react-autosuggest';

const SearchMovie = ({ setMovie }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const moviesPerPage = 12; // Number of movies to display per  page

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
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
        setAllMovies(data);
        setMoviesByGenre(data);
      } catch (error) {
        console.error('Fetch Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
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
        const genres = [...new Set(data.flatMap(movie => movie.genre))];
        setGenres(genres);
      } catch (error) {
        console.error('Fetch Error:', error);
        setError(error.message);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

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

      const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));

      if (filteredMovies.length > 0) {
        setMoviesByGenre(filteredMovies); // Set the movies to display in the list
        setMovieDetails(null); // Clear the single movie detail view
        setCurrentPage(0); // Reset to the first page of results
      } else {
        setError('No results found');
        setMovie(null);
        setMovieDetails(null);
        setMoviesByGenre([]); // Clear movies by genre when no search result is found
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setError(error.message);
      setMovie(null);
      setMovieDetails(null);
      setMoviesByGenre([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = async (genre) => {
    setLoading(true);
    setError(null);

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

      // Filter movies by genre
      const filteredMovies = data.filter(movie => movie.genre.includes(genre));

      setMoviesByGenre(filteredMovies); // Set the movies to display in the list
      setMovieDetails(null); // Clear the single movie detail view
      setCurrentPage(0); // Reset to the first page of results
    } catch (error) {
      console.error('Fetch Error:', error);
      setError('Failed to fetch movies by genre. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (event, { newValue }) => {
    setQuery(newValue);

    if (newValue.trim() !== '') {
      const filteredSuggestions = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(newValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 10)); // Limit suggestions to first 5 matches
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setSuggestions([]);
    handleSearch();
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 10 - fullStars - halfStar;

    const starArray = [];
    for (let i = 0; i < fullStars; i++) {
      starArray.push(<FontAwesomeIcon icon={faStar} key={`full-${i}`} style={{ color: '#FFD700' }} />);
    }
    if (halfStar === 1) {
      starArray.push(<FontAwesomeIcon icon={faStarHalfAlt} key={`half`} style={{ color: '#FFD700' }} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      starArray.push(<FontAwesomeIcon icon={faStar} key={`empty-${i}`} style={{ color: '#ccc' }} />);
    }

    return (
      <span>
        {starArray} ({rating}/10)
      </span>
    );
  };

  const indexOfLastMovie = (currentPage + 1) * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = moviesByGenre.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const totalPages = Math.ceil(moviesByGenre.length / moviesPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '100vh' }}>
      <h1 style={{ color: 'red' }}>Movie Recommendation App</h1>
      <div style={{ marginBottom: '20px',}}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => handleQueryChange(null, { newValue: value })}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={suggestion => suggestion.title}
          renderSuggestion={suggestion => <div>{suggestion.title}</div>}
          inputProps={{
            placeholder: 'Search for a movie...',
            value: query,
            onChange: handleQueryChange,
            style: {
              padding: '10px',
              marginRight: '10px',
              fontSize: '16px',
              width: '300px',
              borderRadius: '10px'
            }
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '7px',
            marginTop:'20px',
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div style={{ marginBottom: '20px' }}>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            style={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#102C57',
              color: '#fff',
              border: 'none',
              margin: '5px',
              cursor: 'pointer',
              borderRadius: '6px'
            }}
          >
            {genre}
          </button>
        ))}
      </div>
      {movieDetails && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', maxWidth: '800px', textAlign: 'left', marginLeft: '20px', backgroundColor: 'black', color: 'white', borderRadius: '10px' }}>
          <div style={{ marginRight: '20px', marginLeft: '20px' }}>
            <h2>{movieDetails.title}</h2>
            <p>{movieDetails.description}</p>
            <p>Rating: {renderStars(movieDetails.rating)}</p>
            <p>Year: {movieDetails.year}</p>
          </div>
          <div>
            <img src={movieDetails.image} alt={movieDetails.title} style={{ borderRadius: '10px', maxWidth: '200px' }} />
          </div>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {currentMovies.map((movie, index) => (
          <div
            key={index}
            style={{
              width: '200px',
              margin: '10px',
              padding: '10px',
              backgroundColor: 'black',
              color: 'white',
              textAlign: 'center',
              borderRadius: '10px',
            }}
          >
            <img src={movie.image} alt={movie.title} style={{ width: '50%', borderRadius: '10px' }} />
            <h2 style={{ fontSize: '18px' }}>{movie.title}</h2>
            <p>Rating: {renderStars(movie.rating)}</p>
            <p>{movie.year}</p>
          </div>
        ))}
      </div>
      <div>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakLinkClassName={'page-link'}
        />
      </div>
      <style>
        {`
          .pagination {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 20px 0;
          }

          .page-item {
            margin: 0 5px;
          }

          .page-link {
            padding: 10px 15px;
            border: 1px solid #ddd;
            color: #007bff;
            cursor: pointer;
            border-radius: 5px;
            text-decoration: none;
          }

          .page-link:hover {
            background-color: #007bff;
            color: white;
          }

          .active .page-link {
            background-color: #007bff;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default SearchMovie;


























