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
  movieItemUI.setAttribute("class", "movie-item");
  movieItemUI.setAttribute("data-id", movie.id);
  movieItemUI.setAttribute("data-content", JSON.stringify(movie));
  movieItemUI.innerHTML = `
    <img
      src="https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}"
      alt="${movie.title} 포스터"
    />
    <div class="movie-content">
      <p>${movie.title}</p>
      평점 : ${movie.vote_average}
    </div>
  `;
  return movieItemUI;
}

export function clearMovieContainer() {
  $movieContainer.innerHTML = "";
}
