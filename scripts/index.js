import { Bookmark } from "../components/ui/bookmark.js";
import { Home } from "../components/ui/home.js";
import { Movie } from "../components/ui/movie.js";
import { debounce } from "../lib/utils/debounce.util.js";
import { SitemapType } from "../types/sitemap.type.js";

const movieContainer = document.getElementById("movie-container");
const movieSearchBox = document.getElementById("movie-search-box");
const homeButton = document.getElementById("home-button");
const bookmarkButton = document.getElementById("bookmark-button");

let currentPage = SitemapType.HOME;

Movie.createMovieList(await Home.getMovieInfoList());

async function handleMovieSearchBoxChanged(e) {
  const results = await getSearchMovieList(e);
  Movie.createMovieList(results);
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

homeButton.addEventListener("click", async () => {
  if (currentPage === SitemapType.HOME) return;
  currentPage = SitemapType.HOME;
  const results = await Home.getMovieInfoList();
  Movie.createMovieList(results);
});

bookmarkButton.addEventListener("click", () => {
  if (currentPage === SitemapType.BOOKMARK) return;
  currentPage = SitemapType.BOOKMARK;
  const results = Bookmark.getMovieInfoList();
  Movie.createMovieList(results);
});

function getHandleMovieClick() {
  switch (currentPage) {
    case SitemapType.HOME:
      return Home.handleMovieClick;
    case SitemapType.BOOKMARK:
      return Bookmark.handleMovieClick;
    default:
      return () => {};
  }
}

async function getSearchMovieList(e) {
  switch (currentPage) {
    case SitemapType.HOME:
      return await Home.getSearchMovieInfoList(e);
    case SitemapType.BOOKMARK:
      return Bookmark.getSearchMovieInfoList(e);
    default:
      return () => {};
  }
}
