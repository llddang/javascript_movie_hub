import { getPopularMovieList } from "../lib/api/movie.api.js";
import { debounce } from "../lib/utils/debounce.util.js";
import { SitemapType } from "../types/sitemap.type.js";
import {
  getAllBookmarkMovieList,
  getBookmarkSearchMovieList,
  handleBookmarkMovieClick,
} from "./bookmark.js";
import { getHomeSearchMovieList, handleHomeMovieClick } from "./home.js";

const movieContainer = document.getElementById("movie-container");
const movieSearchBox = document.getElementById("movie-search-box");
const homeButton = document.getElementById("home-button");
const bookmarkButton = document.getElementById("bookmark-button");

let currentPage = SitemapType.HOME;

createMovieList();

async function handleMovieSearchBoxChanged(e) {
  const results = await getSearchMovieList();
  createMovieList(results);
}

const handleMovieSearchBoxChangedWithDebounce = debounce((e) =>
  handleMovieSearchBoxChanged(e)
);

movieContainer.addEventListener("click", (e) => {
  getHandleMovieClick()(e);
});
movieSearchBox.addEventListener(
  "keyup",
  handleMovieSearchBoxChangedWithDebounce
);

homeButton.addEventListener("click", () => {
  if (currentPage === SitemapType.HOME) return;
  currentPage = SitemapType.HOME;
  createMovieList();
});

bookmarkButton.addEventListener("click", () => {
  if (currentPage === SitemapType.BOOKMARK) return;
  currentPage = SitemapType.BOOKMARK;
  createMovieList();
});

async function createMovieList() {
  movieContainer.innerHTML = ``;
  const results = await getMovieList();

  results.forEach(createMovieItem);
}

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

async function getMovieList() {
  switch (currentPage) {
    case SitemapType.HOME:
      return await getPopularMovieList().then((res) => res.results);

    case SitemapType.BOOKMARK:
      return getAllBookmarkMovieList();
  }

  return [];
}

function getHandleMovieClick() {
  console.log(currentPage);
  switch (currentPage) {
    case SitemapType.HOME:
      return handleHomeMovieClick;
    case SitemapType.BOOKMARK:
      return handleBookmarkMovieClick;
    default:
      return () => {};
  }
}

async function getSearchMovieList() {
  switch (currentPage) {
    case SitemapType.HOME:
      return getHomeSearchMovieList;
    case SitemapType.BOOKMARK:
      return getBookmarkSearchMovieList;
    default:
      return () => {};
  }
}
