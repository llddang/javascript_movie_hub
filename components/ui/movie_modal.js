import { SitemapType } from "../../types/sitemap.type.js";
import { Toast } from "../common/toast.js";

export function drawMovieModalUi(movie, movieCard) {
  const movieModalWrapper = document.createElement("div");
  movieModalWrapper.className = "movie-modal-wrapper";

  movieModalWrapper.innerHTML = `
    <div class="movie-modal-wrapper">
      <img class="movie-modal-dim" 
          src="https://image.tmdb.org/t/p/w1280${movie.backdrop_path}" />
      <div class="movie-modal">
        <img class="movie-modal-poster-image" 
            src="https://image.tmdb.org/t/p/w1280${movie.poster_path}" />
        <div class="movie-modal-button-container">
          <button id="toggle-bookmark-button">
            ${
              movie.isBookmarked
                ? `<i class="fa-solid fa-star"></i>`
                : `<i class="fa-regular fa-star"></i>`
            }
          </button>
          <button id="close-movie-modal-button">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="movie-modal-content">
          <p class="movie-modal-title">${movie.title}</p>
          <p class="movie-modal-overview">${movie.overview}</p>
          <p class="movie-modal-score">평점 : ${movie.vote_average}</p>
        </div>
      </div>
    </div>`;

  movieModalWrapper.addEventListener("click", function (e) {
    handleMovieModalClick.call(this, e, movieCard);
  });
  document.body.appendChild(movieModalWrapper);
}

function handleMovieModalClick(e, movieCard) {
  const movieModalDim = e.target.closest(".movie-modal-dim");
  const toggleBookmarkButton = e.target.closest("#toggle-bookmark-button");
  const closeMovieModalButton = e.target.closest("#close-movie-modal-button");

  if (!movieModalDim && !toggleBookmarkButton && !closeMovieModalButton) return;

  if (toggleBookmarkButton) handleToggleBookmarkButtonClick(movieCard);
  this.remove();
}

function handleToggleBookmarkButtonClick(movieCard) {
  const movieId = Number(movieCard.getAttribute("data-id"));
  const movieInfo = JSON.parse(movieCard.getAttribute("data-movie-info"));

  movieInfo.isBookmarked = !movieInfo.isBookmarked;
  movieCard.setAttribute("data-movie-info", JSON.stringify(movieInfo));

  if (movieInfo.isBookmarked)
    handleAddBookmarkClick(movieId, JSON.stringify(movieInfo));
  else handleCancelBookmarkClick(movieId, movieCard);
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
