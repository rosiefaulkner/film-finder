var likedMovies = [];
var dislikedMovies = [];
// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById("genres");

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById("genres").value;
  return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById("likeOrDislikeBtns");
  btnDiv.removeAttribute("hidden");
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  moviePosterDiv.innerHTML = "";
  movieTextDiv.innerHTML = "";
  moviePreference.innerHTML = "";
};

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
  likedMovies.push(document.getElementsByTagName('h1')[1].innerHTML);
  clearCurrentMovie();
  showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
  dislikedMovies.push(document.getElementsByTagName('h1')[1].innerHTML);
  clearCurrentMovie();
  showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", moviePosterUrl);
  posterImg.setAttribute("id", "moviePoster");

  return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "movieTitle");
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("id", "movieOverview");
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

const likedAndDislikedParagraph = (movieTitle, liked) => {
  const preferences = document.createElement("p");
  preferences.setAttribute("id", "preferences");
  if (liked) {
    preferences.innerHTML = "<strong>Liked Movies:</strong> " + movieTitle;
  }else{
    preferences.innerHTML = "<strong>Disliked Movies:</strong> " + movieTitle;
  }

  return preferences;
}

//create cast of movie
const createCast = (cast) => {
  const casting = document.createElement("p");
  casting.setAttribute("id", "cast");
  casting.innerHTML = cast.cast.map((person) => person.name).join(", ");
  return casting;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo, movieCast) => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  const moviePreferenceDiv = document.getElementById("moviePreference");
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);
  const cast = createCast(movieCast);
  const liked = likedAndDislikedParagraph(likedMovies, true);
  const disliked = likedAndDislikedParagraph(dislikedMovies, false);

  // Append title, poster, overview, and cast to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);
  movieTextDiv.appendChild(cast);
  moviePreference.appendChild(liked);
  moviePreference.appendChild(disliked);


  showBtns();
  likeBtn.onclick = likeMovie;
  dislikeBtn.onclick = dislikeMovie;
};
