import { Bookmark } from "../components/ui/bookmark.js";
import { Home } from "../components/ui/home.js";
import { Movie } from "../components/ui/movie.js";
import { debounce } from "../lib/utils/debounce.util.js";
import { SitemapType } from "../types/sitemap.type.js";
import {
  getHandleMovieClick,
  getSearchMovieList,
} from "../components/ui/sitemap.js";

const movieContainer = document.getElementById("movie-container");
const movieSearchBox = document.getElementById("movie-search-box");
const homeButton = document.getElementById("home-button");
const bookmarkButton = document.getElementById("bookmark-button");

window.currentPage = SitemapType.HOME;

/* 초기 영화 목록 띄우기 */
Movie.createMovieList(await Home.getMovieInfoList());

/* 영화 포스터가 아닌 container에 이벤트 걸고, 이벤트 위임 */
movieContainer.addEventListener("click", (e) => {
  getHandleMovieClick()(e);
});

/* input 이벤트 핸들러 + debounce 적용 */
const handleSearchMovieListWithDebounce = debounce(async (e) => {
  const results = await getSearchMovieList(e);
  Movie.createMovieList(results);
});
movieSearchBox.addEventListener("keyup", handleSearchMovieListWithDebounce);

/* HomeButton 클릭 시 이벤트 */
homeButton.addEventListener("click", async () => {
  if (window.currentPage === SitemapType.HOME) return;
  window.currentPage = SitemapType.HOME;
  const results = await Home.getMovieInfoList();
  Movie.createMovieList(results);
});

/* BookmarkButton 클릭 시 이벤트 */
bookmarkButton.addEventListener("click", () => {
  if (window.currentPage === SitemapType.BOOKMARK) return;
  window.currentPage = SitemapType.BOOKMARK;
  const results = Bookmark.getMovieInfoList();
  Movie.createMovieList(results);
});
