import { SitemapType } from "../../types/sitemap.type.js";
import { Home } from "./home.js";
import { Bookmark } from "./bookmark.js";

export function getHandleMovieClick() {
  switch (currentPage) {
    case SitemapType.HOME:
      return Home.handleMovieClick;
    case SitemapType.BOOKMARK:
      return Bookmark.handleMovieClick;
    default:
      return () => {};
  }
}

export async function getSearchMovieList(e) {
  switch (currentPage) {
    case SitemapType.HOME:
      return await Home.getSearchMovieInfoList(e);
    case SitemapType.BOOKMARK:
      return Bookmark.getSearchMovieInfoList(e);
    default:
      return () => {};
  }
}
