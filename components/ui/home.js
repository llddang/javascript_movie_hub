import { MovieDetailModal } from "./movie_detail_modal.js";
import { BookmarkType } from "../../types/bookmark.type.js";
import {
  getPopularMovieList,
  getSearchMovieList,
} from "../../lib/api/movie.api.js";

export class Home {
  static movieModal = new MovieDetailModal(BookmarkType.ADD);

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

  static async getMovieInfoList() {
    return await getPopularMovieList().then((res) => res.results);
  }

  static async getSearchMovieInfoList(e) {
    const keyword = e.target.value;

    if (keyword)
      return await getSearchMovieList(keyword).then((res) => res.results);
    else return await getPopularMovieList().then((res) => res.results);
  }
}
