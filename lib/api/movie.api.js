import { fetchAPI } from "./fetch.api.js";
import { KOREA_LANGUAGE, KOREA_REGION } from "../../constants/query.data.js";

export async function getPopularMovieList(page = 1, isKorea = true) {
  const query = {
    language: KOREA_LANGUAGE,
    page,
    region: isKorea ? KOREA_REGION : "",
  };

  return await fetchAPI("/movie/popular", query);
}

export async function getSearchMovieList(query, page = 1, isKorea = true) {
  const queries = {
    page,
    query,
    include_adult: false,
    language: KOREA_LANGUAGE,
    region: isKorea ? KOREA_REGION : "",
  };

  return await fetchAPI("/search/movie", queries);
}
