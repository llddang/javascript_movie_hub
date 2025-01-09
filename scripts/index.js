import { getPopularMovieList } from "../lib/api/movie.api.js";

const movieContainer = document.getElementById("movie-container");

await getPopularMovieList().then((res) => {
  res.results.forEach((movie) => {
    const item = document.createElement("li");
    item.setAttribute("class", "movie-item");
    item.setAttribute("key", movie.id);
    item.innerHTML = `
      <img
        src="https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}"
      />
      <div class="movie-content">
        <p>${movie.title}</p>
        평점 : ${movie.vote_average}
      </div>
    `;
    movieContainer.appendChild(item);
  });
});
