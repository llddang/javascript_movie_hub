import { MovieModalType } from "../../types/movie_modal.type.js";
import { Modal } from "../common/modal.js";
import { Toast } from "../common/toast.js";

export class MovieModal extends Modal {
  constructor() {
    super();
  }

  open(movie, type, onClose) {
    this.movie = movie;
    this.type = type;
    this.onClose = onClose || (() => {});
    const content = this.createContent();

    const modal = this.createModal(movie.title, content);
    const modalBackdrop = this.createModalBackdrop();

    document.body.style.overflow = "hidden";
    document.body.append(modalBackdrop);
    document.body.append(modal);
  }

  createContent() {
    const content = document.createElement("div");
    content.style = "display: flex; flex-direction: column; gap: 1.25rem;";
    content.innerHTML = `
      <img
        class="movie-modal-poster"
        src="https://media.themoviedb.org/t/p/w220_and_h330_face/${this.movie.poster_path}"
        alt="${this.movie.title} 포스터" />
      <b style="movie-modal-title">${this.movie.title}</b>
      <p>${this.movie.overview}</p>
      <p><b>개봉일: </b>${this.movie.release_date}</p>
      <p><b>평점: </b>${this.movie.vote_average}</p>
    `;

    const bookmarkButton = this.createBookmarkButton();
    content.append(bookmarkButton);

    return content;
  }

  createBookmarkButton() {
    const bookmarkButton = document.createElement("button");
    bookmarkButton.setAttribute("class", "movie-modal-bookmark-button");

    if (this.type === MovieModalType.ADD) {
      bookmarkButton.innerText = "북마크 추가";
      bookmarkButton.addEventListener("click", () =>
        this.handleAddBookmarkClick()
      );
    } else {
      bookmarkButton.innerText = "북마크 취소";
      bookmarkButton.addEventListener("click", () =>
        this.handleCancelBookmarkClick()
      );
    }

    return bookmarkButton;
  }

  handleAddBookmarkClick() {
    localStorage.setItem(this.movie.id, JSON.stringify(this.movie));
    this.onClose();
    this.handleClose();
    Toast.info("북마크에 추가했습니다.");
  }

  handleCancelBookmarkClick() {
    localStorage.removeItem(this.movie.id);
    this.onClose();
    this.handleClose();
    Toast.info("북마크에서 삭제했습니다.");
  }
}
