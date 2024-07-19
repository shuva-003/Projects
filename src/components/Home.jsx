import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const top10Movies = data.slice(0, 10);
        setMovies(top10Movies);
      } catch (error) {
        console.error('Fetch Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>GET EXCITED WITH US</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div style={styles.sliderContainer}>
          <Slider {...settings}>
            {movies.map((movie, index) => (
              <div key={index} style={styles.slide}>
                <img src={movie.image} alt={movie.title} style={styles.image} />
                <h3 style={styles.movieTitle}>{movie.title}</h3>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '10px',
    margin: '0 auto',
    maxWidth: '1500px',
    width: '100%',
  },
  title: {
    fontSize: 'calc(2rem + 5vw)',
    color: '#379777',
    marginTop: '30px',
    marginBottom: '40px',
  },
  sliderContainer: {
    width: '70%',
    margin: '0 auto',
  },
  slide: {
    padding: '10px',
  },
  image: {
    width: '100%',
    height: '500px',
    borderRadius: '10px',
  },
  movieTitle: {
    fontSize: '1.2rem',
    marginTop: '10px',
  },
};

export default Home;
















