import { MovieDetailModal } from "../components/ui/movieDetailModal.js";
import { BookmarkType } from "../types/bookmark.type.js";

const movieContainer = document.getElementById("movie-container");
const movieModal = new MovieDetailModal(BookmarkType.CANCEL);

export function handleBookmarkMovieClick(e) {
  const movieItem = e.target.closest(".movie-item");
  if (!movieItem) return;

  const contentStr = movieItem.getAttribute("data-content");
  const content = JSON.parse(contentStr);

  console.log(movieModal.type);
  movieModal.open(content, () => {
    movieItem.remove();
  });
}

export function getBookmarkSearchMovieList(e) {
  movieContainer.innerHTML = "";

  const keyword = e.target.value;

  if (keyword)
    return getAllBookmarkMovieList().filter((movie) =>
      movie.title.includes(keyword)
    );

  return getAllBookmarkMovieList();
}

export function getAllBookmarkMovieList() {
  return Array.from({ length: localStorage.length }, (_, i) =>
    localStorage.key(i)
  )
    .filter((key) => Number(key))
    .map((key) => JSON.parse(localStorage.getItem(key)));
}
