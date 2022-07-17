const tmdbKey = "96b40758765e6080ba45a3bc25b75b2e";
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
         if(response.ok) { 
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  }
  catch(error) {
    console.log(error);
  };
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies
    }
  }
  catch(error) {
    console.log(error);
  };
};

const getMovieCast = async (movie) => {
  const movieId = movie.id;
  const movieCastEndpoint = "/movie/" + movieId + "/credits";
  const requestParams = "?api_key=" + tmdbKey;
  const urlToFetch = tmdbBaseUrl + movieCastEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch, { cache: "no-cache" });
    if (response.ok) {
      const movieCast = await response.json();
      return movieCast;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndPoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${movieEndPoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      
      return movieInfo
    }
  }
  catch(error){
    console.log(error);
  };
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
 const movies = await getMovies();
 const randomMovie = getRandomMovie(movies);
 const info = await getMovieInfo(randomMovie);
 const cast = await getMovieCast(randomMovie);
 displayMovie(info, cast);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;