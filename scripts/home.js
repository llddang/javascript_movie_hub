import { MovieDetailModal } from "../components/ui/movieDetailModal.js";
import { BookmarkType } from "../types/bookmark.type.js";

const movieModal = new MovieDetailModal(BookmarkType.ADD);

export function handleHomeMovieClick(e) {
  const movieItem = e.target.closest(".movie-item");
  if (!movieItem) return;

  const contentStr = movieItem.getAttribute("data-content");
  const content = JSON.parse(contentStr);

  movieModal.open(content);
}

export async function getHomeSearchMovieList(e) {
  movieContainer.innerHTML = "";

  const keyword = e.target.value;

  if (target)
    return await getSearchMovieList(keyword).then((res) => res.results);
  return await getPopularMovieList().then((res) => res.results);
}
