import { Toast } from "../common/toast.js";
import { SitemapType } from "../../types/sitemap.type.js";

export default function MovieModal({ movieInfo, movieCard }) {
  const $this = document.createElement("div");
  $this.classList.add("movie-modal-wrapper");

  let isNotLoaded = true;

  function innerHTMLTemplate() {
    return `
      ${
        isNotLoaded
          ? `<div class="movie-modal-dim"><div class="skeleton-ui-circle movie-modal-skeleton"></div></div>`
          : ""
      }
      <img class="movie-modal-dim ${isNotLoaded && "hidden"}" 
          src="https://image.tmdb.org/t/p/w1280${movieInfo.backdrop_path}" />
      <div class="movie-modal  ${isNotLoaded && "hidden"}">
        <img class="movie-modal-poster-image" 
            src="https://image.tmdb.org/t/p/w1280${movieInfo.poster_path}" />
        <div class="movie-modal-button-container">
          <button id="toggle-bookmark-button">
            ${
              movieInfo.isBookmarked
                ? `<i class="fa-solid fa-star"></i>`
                : `<i class="fa-regular fa-star"></i>`
            }
          </button>
          <button id="close-movie-modal-button">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="movie-modal-content">
          <p class="movie-modal-title">${movieInfo.title}</p>
          <p class="movie-modal-overview">${movieInfo.overview}</p>
          <p class="movie-modal-score">평점 : ${movieInfo.vote_average}</p>
        </div>
      </div>`;
  }

  render();
  bindEvents();

  return {
    element: $this,
    render,
  };

  function render() {
    $this.innerHTML = innerHTMLTemplate();
  }

  function bindEvents() {
    $this.addEventListener("click", (e) => {
      if (e.target.closest("#toggle-bookmark-button"))
        handleClickBookmarkToggleButton();
      if (
        !e.target.closest(".movie-modal-dim") &&
        !e.target.closest("#close-movie-modal-button") &&
        !e.target.closest("#toggle-bookmark-button")
      )
        return;

      $this.remove();
      document.body.style.overflow = "auto";
    });

    $this
      .getElementsByClassName("movie-modal-poster-image")[0]
      .addEventListener("load", () => {
        isNotLoaded = false;
        render();
      });
  }

  function handleClickBookmarkToggleButton() {
    movieInfo.isBookmarked = !movieInfo.isBookmarked;
    movieCard.setAttribute("data-movie-info", JSON.stringify(movieInfo));

    if (movieInfo.isBookmarked)
      addBookmark(movieInfo.id, JSON.stringify(movieInfo));
    else removeBookmark(movieInfo.id);
  }

  function addBookmark(movieId, movieInfo) {
    localStorage.setItem(movieId, movieInfo);
    Toast.info("북마크에 추가했습니다.");
  }

  function removeBookmark(movieId) {
    localStorage.removeItem(movieId);
    Toast.info("북마크에 삭제했습니다.");
    if (window.currentPage === SitemapType.BOOKMARK) movieCard.remove();
  }
}
