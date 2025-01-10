import { MovieDetailModal } from "./movie_detail_modal.js";
import { BookmarkType } from "../../types/bookmark.type.js";

export class Bookmark {
  static movieModal = new MovieDetailModal(BookmarkType.CANCEL);

  constructor() {}

  static handleMovieClick = (e) => {
    const movieItem = e.target.closest(".movie-item");
    if (!movieItem) return;

    const contentStr = movieItem.getAttribute("data-content");
    const content = JSON.parse(contentStr);

    this.movieModal.open(content, () => {
      movieItem.remove();
    });
  };

  static getMovieInfoList() {
    return Array.from({ length: localStorage.length }, (_, i) =>
      localStorage.key(i)
    )
      .filter((key) => Number(key))
      .map((key) => JSON.parse(localStorage.getItem(key)));
  }

  static getSearchMovieInfoList(e) {
    const keyword = e.target.value;

    if (keyword)
      return this.getMovieInfoList().filter((movie) =>
        movie.title.includes(keyword)
      );

    return this.getMovieInfoList();
  }
}
