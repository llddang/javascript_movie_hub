import MovieCard from "./MovieCard.js";

const $movieContainer = document.getElementsByClassName("movie-container")[0];

export function drawMovieListUi(movies, doClearMovieContainer = false) {
  if (doClearMovieContainer) clearMovieContainer();

  movies.forEach((movieInfo) => {
    const { element } = MovieCard({ movieInfo });
    $movieContainer.appendChild(element);
  });
}

export function clearMovieContainer() {
  $movieContainer.innerHTML = "";
}
