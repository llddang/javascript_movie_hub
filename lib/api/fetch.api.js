import { filterEmptyQuery, stringifyQuery } from "../utils/request.util.js";
import { TOKEN, API_URL } from "../../sparta09_movie_hub_config/config.js";

export async function fetchAPI(path, query, options = {}) {
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

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
