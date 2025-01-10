export class Movie {
  constructor() {}

  static movieContainer = document.getElementById("movie-container");

  static createMovieList(results) {
    this.clearMovieItems();

    results.forEach((movie) => this.createMovieItem(movie));
  }

  static appendMovieItems(results) {
    results.forEach((movie) => this.createMovieItem(movie));
  }

  static createMovieItem(movie) {
    const item = document.createElement("li");
    item.setAttribute("class", "movie-item");
    item.setAttribute("data-id", movie.id);
    item.setAttribute("data-content", JSON.stringify(movie));
    item.innerHTML = `
      <img
        src="https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}"
        alt="${movie.title} 포스터"
      />
      <div class="movie-content">
        <p>${movie.title}</p>
        평점 : ${movie.vote_average}
      </div>
    `;
    this.movieContainer.appendChild(item);
  }

  static clearMovieItems() {
    this.movieContainer.innerHTML = "";
  }
}
