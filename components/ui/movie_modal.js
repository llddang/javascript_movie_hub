import { SitemapType } from "../../types/sitemap.type.js";
import { Toast } from "../common/toast.js";

const $movieModalWrapper = document.getElementsByClassName(
  "movie-modal-wrapper"
)[0];
const $movieModalDim = document.getElementsByClassName("movie-modal-dim")[0];
const $movieModal = document.getElementsByClassName("movie-modal")[0];
const $toggleBookmarkButton = document.getElementById("toggle-bookmark-button");
const $movieModalContent = document.getElementsByClassName(
  "movie-modal-content"
)[0];

let _movieCard = null;

export function drawMovieModalUi(movie, movieCard) {
  $movieModalDim.src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  $movieModal.style.background = `top / contain no-repeat url("https://image.tmdb.org/t/p/w1280${movie.poster_path}")`;

  _movieCard = movieCard;
  const movieInfo = JSON.parse(movieCard.getAttribute("data-movie-info"));

  if (movieInfo.isBookmarked)
    $toggleBookmarkButton.innerHTML = `<i class="fa-solid fa-star"></i>`;
  else $toggleBookmarkButton.innerHTML = `<i class="fa-regular fa-star"></i>`;

  $movieModalContent.innerHTML = ` 
    <p class="movie-modal-title">${movie.title}</p>
    <p class="movie-modal-overview">
      ${movie.overview}
    </p>
    <p class="movie-modal-score">평점 : ${movie.vote_average}</p>`;

  $movieModalWrapper.classList.remove("hidden");
}

$movieModalWrapper.addEventListener("click", (e) => handleMovieModalClick(e));

function handleMovieModalClick(e) {
  const movieModalDim = e.target.closest(".movie-modal-dim");
  const toggleBookmarkButton = e.target.closest("#toggle-bookmark-button");
  const closeMovieModalButton = e.target.closest("#close-movie-modal-button");

  if (!movieModalDim && !toggleBookmarkButton && !closeMovieModalButton) return;

  if (toggleBookmarkButton) handleToggleBookmarkButtonClick();
  $movieModalWrapper.classList.add("hidden");
}

function handleToggleBookmarkButtonClick() {
  const movieId = Number(_movieCard.getAttribute("data-id"));
  const movieInfo = JSON.parse(_movieCard.getAttribute("data-movie-info"));

  movieInfo.isBookmarked = !movieInfo.isBookmarked;
  _movieCard.setAttribute("data-movie-info", JSON.stringify(movieInfo));

  if (movieInfo.isBookmarked)
    handleAddBookmarkClick(movieId, JSON.stringify(movieInfo));
  else handleCancelBookmarkClick(movieId, _movieCard);
}

function handleAddBookmarkClick(movieId, movieInfo) {
  localStorage.setItem(movieId, movieInfo);
  Toast.info("북마크에 추가했습니다.");
}

function handleCancelBookmarkClick(movieId, movieCard) {
  localStorage.removeItem(movieId);
  Toast.info("북마크에서 삭제했습니다.");
  if (window.currentPage === SitemapType.BOOKMARK) movieCard.remove();
}
