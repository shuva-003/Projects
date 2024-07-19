import axios from 'axios';

const apiKey = import.meta.env.VITE_IMDB_API_KEY;
const baseUrl = 'https://imdb-api.com/en/API';

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${baseUrl}/SearchMovie/${apiKey}/${query}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/Title/${apiKey}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return null;
  }
};
