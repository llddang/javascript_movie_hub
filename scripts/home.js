import { MovieDetailModal } from "../components/ui/movieDetailModal.js";
import {
  getPopularMovieList,
  getSearchMovieList,
} from "../lib/api/movie.api.js";
import { BookmarkType } from "../types/bookmark.type.js";

const movieContainer = document.getElementById("movie-container");
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

  console.log(keyword);
  if (keyword)
    return await getSearchMovieList(keyword).then((res) => res.results);
  else return await getPopularMovieList().then((res) => res.results);
}
