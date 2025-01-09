import { MovieDetailModal } from "../components/ui/movieDetailModal.js";
import { getPopularMovieList } from "../lib/api/movie.api.js";
import { BookmarkType } from "../types/bookmark.type.js";

const movieContainer = document.getElementById("movie-container");

await getPopularMovieList().then((res) => {
  res.results.forEach((movie) => {
    const item = document.createElement("li");
    item.setAttribute("class", "movie-item");
    item.setAttribute("data-id", movie.id);
    item.setAttribute("data-content", JSON.stringify(movie));
    item.innerHTML = `
      <img
        src="https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}"
        alt="${movie.title} 포스터"
      />
      <div class="movie-content">
        <p>${movie.title}</p>
        평점 : ${movie.vote_average}
      </div>
    `;
    movieContainer.appendChild(item);
  });
});

movieContainer.addEventListener("click", handleMovieContainerClick);
function handleMovieContainerClick(e) {
  const movieItem = e.target.closest(".movie-item");
  if (!movieItem) return;

  const contentStr = movieItem.getAttribute("data-content");
  const content = JSON.parse(contentStr);

  new MovieDetailModal(content, BookmarkType.ADD);
}
