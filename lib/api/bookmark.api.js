export function loadMovieListFromLocalStorage() {
  return Array.from({ length: localStorage.length }, (_, i) =>
    localStorage.key(i)
  )
    .filter((key) => Number(key))
    .map((key) => JSON.parse(localStorage.getItem(key)));
}

export function loadSearchedMovieListFromLocalStorage(keyword) {
  if (keyword)
    return loadMovieListFromLocalStorage().filter((movie) =>
      movie.title.includes(keyword)
    );

  return loadMovieListFromLocalStorage();
}
