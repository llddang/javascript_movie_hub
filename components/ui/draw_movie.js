const $movieContainer = document.getElementsByClassName("movie-container")[0];

export function drawMovieListUi(movies, doClearMovieContainer = false) {
  if (doClearMovieContainer) clearMovieContainer();

  movies.forEach((movie) => {
    const movieItemUI = createMovieItemUi(movie);
    $movieContainer.appendChild(movieItemUI);
  });
}

export function createMovieItemUi(movie) {
  const movieItemUI = document.createElement("li");
  movieItemUI.setAttribute("class", "movie-card");
  movieItemUI.setAttribute("data-id", movie.id);
  movieItemUI.setAttribute("data-content", JSON.stringify(movie));
  movieItemUI.style.backgroundImage = `url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")`;

  movieItemUI.addEventListener("mouseenter", () => {
    movieItemUI.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0), rgba(0, 0, 0, 0.4)), url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")`;
    movieItemUI.innerHTML = `
      <p class="movie-card-title">${movie.title}</p>
      <p class="movie-card-description">
        ${movie.overview.substring(0, 150)}
        ${movie.overview.length > 150 ? "..." : ""}
      </p>
      <p class="movie-card-vote">평점 : ${movie.vote_average}</p>
    `;
  });
  movieItemUI.addEventListener("mouseleave", () => {
    movieItemUI.style.backgroundImage = `url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")`;
    movieItemUI.innerHTML = "";
  });
  return movieItemUI;
}

export function clearMovieContainer() {
  $movieContainer.innerHTML = "";
}
