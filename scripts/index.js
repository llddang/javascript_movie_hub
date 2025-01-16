import {
  drawMovieList,
  drawSearchedMovieList,
  handleClickMovieCard,
} from "./sitemap.js";
import { SitemapType } from "../types/sitemap.type.js";
import { debounce } from "../lib/utils/debounce.util.js";

window.currentPage = SitemapType.HOME;
window.currentPageNumber = 0;

const $logoButton = document.getElementById("logo-button");
const $searchMovieButton = document.getElementById("search-movie-button");
const $searchMovieInput = document.getElementById("search-movie-input");
const $toggleSitemapButton = document.getElementById("toggle-sitemap-button");
const $movieContainer = document.getElementsByClassName("movie-container")[0];

/* page 변환 번튼 클릭 */
$logoButton.addEventListener("click", () =>
  handleSitemapClick(SitemapType.HOME)
);
$toggleSitemapButton.addEventListener("click", (e) =>
  handleSitemapClick(e.target.getAttribute("data-go"))
);
function handleSitemapClick(goPage) {
  if (window.currentPage === goPage) return;
  $toggleSitemapButton.innerText =
    goPage === SitemapType.HOME ? "북마크 보기" : "메인으로 돌아가기";
  $toggleSitemapButton.setAttribute("data-go", window.currentPage);
  window.currentPage = goPage;
  window.currentPageNumber = 0;
  window.scrollTo(0, 0);
  drawMovieList();
}

/* 검색 버튼 click 이벤트 및 focus out 이벤트 */
$searchMovieButton.addEventListener("click", () => {
  $searchMovieInput.classList.remove("hidden");
  $searchMovieInput.focus();
});
$searchMovieInput.addEventListener("focusout", (e) => {
  if (e.target.value !== "") return;
  $searchMovieInput.classList.add("hidden");
});

/* 초기 영화 목록 띄우기 */
drawMovieList();

/* 영화 검색창 input 이벤트 핸들러 + debounce 적용 */
const handleSearchMovieWithDebounce = debounce((e) => {
  window.currentPageNumber = 0;
  drawSearchedMovieList(e.target.value);
});
$searchMovieInput.addEventListener("keyup", handleSearchMovieWithDebounce);

/* movie container click 이벤트 핸들러 + 이벤트 위임 */
$movieContainer.addEventListener("click", handleClickMovieCard);

/* 무한 스크롤 구현 */
const maxScrollY = document.body.scrollHeight - window.innerHeight;
const handleScrollChangedWithDeBounce = debounce(async () => {
  if (maxScrollY - window.scrollY >= 620) return;
  if (window.currentPage === SitemapType.BOOKMARK) return;

  if ($searchMovieInput.value === "") drawMovieList();
  else drawSearchedMovieList($searchMovieInput.value);
});
window.addEventListener("scroll", handleScrollChangedWithDeBounce);
