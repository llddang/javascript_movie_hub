import {
  loadPopularMovieListFromTMDB,
  loadSearchedMovieListFromTMDB,
} from "../lib/api/home.api.js";
import {
  loadMovieListFromLocalStorage,
  loadSearchedMovieListFromLocalStorage,
} from "../lib/api/bookmark.api.js";
import { drawMovieListUi } from "../components/ui/draw_movie.js";
import { MovieModal } from "../components/ui/movie_modal.js";
import { SitemapType } from "../types/sitemap.type.js";
import { MovieModalType } from "../types/movie_modal.type.js";

const movieModal = new MovieModal();

export function drawMovieList() {
  if (window.currentPage === SitemapType.HOME) drawMovieListOfHome();
  if (window.currentPage === SitemapType.BOOKMARK) drawMovieListOfBookmark();
}

export function drawSearchedMovieList(keyword) {
  if (window.currentPage === SitemapType.HOME)
    drawSearchedMovieListOfHome(keyword);
  if (window.currentPage === SitemapType.BOOKMARK)
    drawSearchedMovieListOBookmark(keyword);
}

export function handleClickMovieItem(e) {
  const movieItem = e.target.closest(".movie-card");
  if (!movieItem) return;

  const contentStr = movieItem.getAttribute("data-content");
  const content = JSON.parse(contentStr);

  if (window.currentPage === SitemapType.HOME)
    movieModal.open(content, MovieModalType.ADD);
  if (window.currentPage === SitemapType.BOOKMARK)
    movieModal.open(content, MovieModalType.CANCEL, () => movieItem.remove());
}

/* home 관련 */
export async function drawMovieListOfHome() {
  const response = await loadPopularMovieListFromTMDB(
    window.currentPageNumber + 1
  );
  drawMovieListUi(response.results, response.page === 1);
  window.currentPageNumber = response.page;
}

export async function drawSearchedMovieListOfHome(keyword) {
  if (keyword === "") {
    drawMovieListOfHome();
    return;
  }
  const response = await loadSearchedMovieListFromTMDB(
    keyword,
    window.currentPageNumber + 1
  );
  drawMovieListUi(response.results, response.page === 1);
  window.currentPageNumber = response.page;
}

/* bookmark 관련 */
export function drawMovieListOfBookmark() {
  const response = loadMovieListFromLocalStorage();
  drawMovieListUi(response, true);
}

export async function drawSearchedMovieListOBookmark(keyword) {
  const response = loadSearchedMovieListFromLocalStorage(keyword);
  drawMovieListUi(response, true);
}
