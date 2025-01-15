import {
  drawMovieList,
  drawSearchedMovieList,
  handleClickMovieItem,
} from "./sitemap.js";
import { SitemapType } from "../types/sitemap.type.js";
import { debounce } from "../lib/utils/debounce.util.js";

const $movieContainer = document.getElementsByClassName("movie-container")[0];
const $movieSearchBox = document.getElementById("movie-search-box");
const $homeButton = document.getElementById("home-button");
const $bookmarkButton = document.getElementById("bookmark-button");

window.currentPage = SitemapType.HOME;
window.currentPageNumber = 0;

/* 초기 영화 목록 띄우기 */
drawMovieList();

/* 영화 검색창 input 이벤트 핸들러 + debounce 적용 */
const handleSearchMovieWithDebounce = debounce((e) => {
  window.currentPageNumber = 0;
  drawSearchedMovieList(e.target.value);
});
$movieSearchBox.addEventListener("keyup", handleSearchMovieWithDebounce);

/* movie container click 이벤트 핸들러 + 이벤트 위임 */
$movieContainer.addEventListener("click", handleClickMovieItem);

/* page 변환 번튼 클릭 */
$homeButton.addEventListener("click", () =>
  handleSitemapClick(SitemapType.HOME)
);
$bookmarkButton.addEventListener("click", () =>
  handleSitemapClick(SitemapType.BOOKMARK)
);
function handleSitemapClick(currentPage) {
  if (window.currentPage === currentPage) return;
  $movieSearchBox.value = "";
  window.currentPage = currentPage;
  window.currentPageNumber = 0;
  drawMovieList();
}

/* 무한 스크롤 구현 */
const maxScrollY = document.body.scrollHeight - window.innerHeight;
const handleScrollChangedWithDeBounce = debounce(async () => {
  if (maxScrollY - window.scrollY >= 620) return;
  if (window.currentPage === SitemapType.BOOKMARK) return;

  if ($movieSearchBox.value === "") drawMovieList();
  else drawSearchedMovieList($movieSearchBox.value);
});
window.addEventListener("scroll", handleScrollChangedWithDeBounce);
