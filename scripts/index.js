import { MovieDetailModal } from "../components/ui/movieDetailModal.js";
import {
  getPopularMovieList,
  getSearchMovieList,
} from "../lib/api/movie.api.js";
import { debounce } from "../lib/utils/debounce.util.js";
import { BookmarkType } from "../types/bookmark.type.js";

const movieContainer = document.getElementById("movie-container");
const movieSearchBox = document.getElementById("movie-search-box");
const movieModal = new MovieDetailModal(BookmarkType.ADD);

function handleMovieContainerClick(e) {
  const movieItem = e.target.closest(".movie-item");
  if (!movieItem) return;

  const contentStr = movieItem.getAttribute("data-content");
  const content = JSON.parse(contentStr);

  movieModal.open(content);
}

async function handleMovieSearchBoxChanged(e) {
  while (movieContainer.firstChild) {
    movieContainer.removeChild(movieContainer.firstChild);
  }

  if (e.target.value)
    await getSearchMovieList(e.target.value).then((res) =>
      res.results.forEach(createMovieItem)
    );
  else
    await getPopularMovieList().then((res) => {
      res.results.forEach(createMovieItem);
    });
}

const handleMovieSearchBoxChangedWithDebounce = debounce((e) =>
  handleMovieSearchBoxChanged(e)
);

function createMovieItem(movie) {
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
}

await getPopularMovieList().then((res) => {
  res.results.forEach(createMovieItem);
});

movieContainer.addEventListener("click", handleMovieContainerClick);
movieSearchBox.addEventListener(
  "keyup",
  handleMovieSearchBoxChangedWithDebounce
);
