import { fetchAPI } from "./fetch.api.js";

export async function getPopularMovieList(page = 1, isKorea = true) {
  const query = {
    language: "ko-KR",
    page,
    region: isKorea ? "KR" : "",
  };

  return await fetchAPI("/movie/popular", query);
}

export async function getSearchMovieList(keyword, page = 1, isKorea = true) {
  const query = {
    page,
    keyword,
    include_adult: false,
    language: "ko-KR",
    region: isKorea ? "KR" : "",
  };

  return await fetchAPI("/search/movie", query);
}
