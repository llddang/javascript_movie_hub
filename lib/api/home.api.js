import { fetchAPI } from "./fetch.api.js";
import { KOREA_LANGUAGE, KOREA_REGION } from "../../constants/query.data.js";
import { Toast } from "../../components/common/toast.js";

export async function loadPopularMovieListFromTMDB(page = 1, isKorea = true) {
  const query = {
    language: KOREA_LANGUAGE,
    page,
    region: isKorea ? KOREA_REGION : "",
  };

  return fetchAPI(
    "/movie/popular",
    query,
    {},
    {
      onError: async (e) => {
        Toast.error((await e).status_message);
        return { page: -1, results: [] };
      },
    }
  );
}

export async function loadSearchedMovieListFromTMDB(
  query,
  page = 1,
  isKorea = true
) {
  const queries = {
    page,
    query,
    include_adult: false,
    language: KOREA_LANGUAGE,
    region: isKorea ? KOREA_REGION : "",
  };

  return await fetchAPI(
    "/search/movie",
    queries,
    {},
    {
      onError: async (e) => {
        Toast.error((await e).status_message);
        return { page: -1, results: [] };
      },
    }
  );
}
