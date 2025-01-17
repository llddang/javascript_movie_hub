import {
  loadPopularMovieListFromTMDB,
  loadSearchedMovieListFromTMDB,
} from "../lib/api/home.api.js";
import {
  loadMovieListFromLocalStorage,
  loadSearchedMovieListFromLocalStorage,
} from "../lib/api/bookmark.api.js";
import { SitemapType } from "../types/sitemap.type.js";
import MovieModal from "../components/ui/MovieModal.js";
import MovieCard from "../components/ui/MovieCard.js";

export async function renderMovieList(movies) {
  const $movieContainer = document.getElementsByClassName("movie-container")[0];
  if (window.currentPageNumber === 0) $movieContainer.innerHTML = "";

  Promise.resolve(movies).then((res) => {
    res.forEach((movieInfo) => {
      const { element } = MovieCard({ movieInfo });
      $movieContainer.appendChild(element);
    });
  });
}

export function getMovieList() {
  if (window.currentPage === SitemapType.HOME) return getMovieListOfHome();
  if (window.currentPage === SitemapType.BOOKMARK)
    return getMovieListOfBookmark();
}

export function getSearchedMovieList(keyword) {
  if (window.currentPage === SitemapType.HOME)
    return getSearchedMovieListOfHome(keyword);
  if (window.currentPage === SitemapType.BOOKMARK)
    return getSearchedMovieListOBookmark(keyword);
}

export function handleClickMovieCard(e) {
  const movieCard = e.target.closest(".movie-card");
  if (!movieCard) return;

  const movieInfo = JSON.parse(movieCard.getAttribute("data-movie-info"));
  const { element } = MovieModal({ movieInfo, movieCard });
  document.body.appendChild(element);
}

/* home 관련 */
export async function getMovieListOfHome() {
  const response = await loadPopularMovieListFromTMDB(
    window.currentPageNumber + 1
  );
  const moviesWithBookmark = addBookmarkInfoToMovies(response.results);
  window.currentPageNumber = response.page;
  return moviesWithBookmark;
}

export async function getSearchedMovieListOfHome(keyword) {
  if (keyword === "") return getMovieListOfHome();

  const response = await loadSearchedMovieListFromTMDB(
    keyword,
    window.currentPageNumber + 1
  );
  const moviesWithBookmark = addBookmarkInfoToMovies(response.results);
  window.currentPageNumber = response.page;
  return moviesWithBookmark;
}

/* bookmark 관련 */
export function getMovieListOfBookmark() {
  const response = loadMovieListFromLocalStorage();
  window.currentPageNumber = 0;
  return response;
}

export async function getSearchedMovieListOBookmark(keyword) {
  const response = loadSearchedMovieListFromLocalStorage(keyword);
  window.currentPageNumber = 0;
  return response;
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
