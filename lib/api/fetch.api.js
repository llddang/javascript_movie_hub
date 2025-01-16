import { filterEmptyQuery, stringifyQuery } from "../utils/request.util.js";
import { API_URL } from "../../constants/query.data.js";
import { TOKEN } from "../../sparta09_movie_hub_config/config.js";

export async function fetchAPI(path, query, options = {}, statusFn) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
    ...options.headers,
  };

  const filteredQuery = filterEmptyQuery(query);
  const queryString = stringifyQuery(filteredQuery);

  const response = await fetch(`${API_URL}${path}${queryString}`, {
    method: "GET",
    headers,
    ...options,
  });

  if (!response.ok) return statusFn.onError(response.json());

  if (typeof statusFn.onSuccess === "function") statusFn.onSuccess();
  return response.json();
}
