const $movieContainer = document.getElementsByClassName("movie-container")[0];

export function drawMovieListUi(movies, doClearMovieContainer = false) {
  if (doClearMovieContainer) clearMovieContainer();

  movies.forEach((movie) => {
    const movieCardUi = createMovieItemUi(movie);
    $movieContainer.appendChild(movieCardUi);
  });
}

export function createMovieItemUi(movie) {
  const movieCardUi = document.createElement("li");
  movieCardUi.setAttribute("class", "movie-card");
  movieCardUi.setAttribute("data-id", movie.id);
  movieCardUi.setAttribute("data-movie-info", JSON.stringify(movie));
  movieCardUi.style.backgroundImage = `url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")`;

  movieCardUi.addEventListener("mouseenter", () => {
    movieCardUi.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0), rgba(0, 0, 0, 0.4)), url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")`;
    movieCardUi.innerHTML = `
      <p class="movie-card-title">${movie.title}</p>
      <p class="movie-card-description">
        ${movie.overview.substring(0, 150)}
        ${movie.overview.length > 150 ? "..." : ""}
      </p>
      <p class="movie-card-vote">평점 : ${movie.vote_average}</p>
    `;
  });
  movieCardUi.addEventListener("mouseleave", () => {
    movieCardUi.style.backgroundImage = `url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")`;
    movieCardUi.innerHTML = "";
  });
  return movieCardUi;
}

export function clearMovieContainer() {
  $movieContainer.innerHTML = "";
}
