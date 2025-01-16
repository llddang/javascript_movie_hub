import {
  loadPopularMovieListFromTMDB,
  loadSearchedMovieListFromTMDB,
} from "../lib/api/home.api.js";
import {
  loadMovieListFromLocalStorage,
  loadSearchedMovieListFromLocalStorage,
} from "../lib/api/bookmark.api.js";
import { drawMovieListUi } from "../components/ui/draw_movie.js";
import { SitemapType } from "../types/sitemap.type.js";
import MovieModal from "../components/ui/MovieModal.js";

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

export function handleClickMovieCard(e) {
  const movieCard = e.target.closest(".movie-card");
  if (!movieCard) return;

  const movieInfo = JSON.parse(movieCard.getAttribute("data-movie-info"));
  const { element } = MovieModal({ movieInfo, movieCard });
  document.body.appendChild(element);
}

/* home 관련 */
export async function drawMovieListOfHome() {
  const response = await loadPopularMovieListFromTMDB(
    window.currentPageNumber + 1
  );
  const moviesWithBookmark = addBookmarkInfoToMovies(response.results);
  drawMovieListUi(moviesWithBookmark, response.page === 1);
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
  const moviesWithBookmark = addBookmarkInfoToMovies(response.results);
  drawMovieListUi(moviesWithBookmark, response.page === 1);
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

/* 일반 영화 목록과 북마크 결합 */
export function addBookmarkInfoToMovies(movies) {
  const bookmarks = loadMovieListFromLocalStorage().map(
    (bookmark) => bookmark.id
  );

  return movies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarks.includes(movie.id),
  }));
}
