export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const API_URL = "https://api.themoviedb.org/3";

const normalizeResults = (results = []) => {
  return results.map(item => ({
    ...item,
    title: item.title || item.name,
    release_date: item.release_date || item.first_air_date,
  }));
};

export const getAllContent = async (timeWindow = "day") => {
  return getTrendingAll(timeWindow);
};

export const getTrendingAll = async (timeWindow = "day") => {
  try {
    const response = await fetch(`${API_URL}/trending/all/${timeWindow}?api_key=${API_KEY}`);
    const data = await response.json();
    return normalizeResults(data.results);
  } catch (err) {
    console.error("Failed to fetch trending:", err);
    return [];
  }
};

export const getMoviesOnly = async () => {
  try {
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return normalizeResults(data.results);
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return normalizeResults(data.results);
  } catch (err) {
    console.error("Failed to fetch top-rated movies:", err);
    return [];
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movie/upcoming?api_key=${API_KEY}`);
    const data = await response.json();
    return normalizeResults(data.results);
  } catch (err) {
    console.error("Failed to fetch upcoming movies:", err);
    return [];
  }
};

export const getTvShows = async () => {
  try {
    const response = await fetch(`${API_URL}/tv/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return normalizeResults(data.results);
  } catch (err) {
    console.error("Failed to fetch TV shows:", err);
    return [];
  }
};

export const getTopRatedTv = async () => {
  try {
    const response = await fetch(`${API_URL}/tv/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return normalizeResults(data.results);
  } catch (err) {
    console.error("Failed to fetch top-rated TV:", err);
    return [];
  }
};

export const getAnimeShows = async () => {
  try {
    const response = await fetch(`${API_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja`);
    const data = await response.json();
    return normalizeResults(data.results);
  } catch (err) {
    console.error("Failed to fetch anime:", err);
    return [];
  }
};
export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch movie details:", err);
    return null;
  }
};

export const getMovieReviews = async (id) => {
  try {
    const response = await fetch(`${API_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error("Failed to fetch movie reviews:", err);
    return [];
  }
};
export const searchMulti = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${API_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    const filtered = (data.results || []).filter(item => item.media_type === 'movie' || item.media_type === 'tv');
    return normalizeResults(filtered);
  } catch (err) {
    console.error("Failed to search:", err);
    return [];
  }
};