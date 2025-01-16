import { API_IMAGE_URL } from "../../constants/query.data.js";

export default function MovieCard({ movieInfo }) {
  const $this = document.createElement("li");
  $this.setAttribute("class", "movie-card");
  $this.setAttribute("data-id", movieInfo.id);
  $this.setAttribute("data-movie-info", JSON.stringify(movieInfo));

  let isHover = false;

  const innerHTMLTemplate = () => `
    <img src="${API_IMAGE_URL + movieInfo.backdrop_path}"
      class="movie-card-image"/>
    ${
      isHover
        ? `
          <div class="movie-card-image-gradient"></div>
          <p class="movie-card-title">${movieInfo.title}</p>
          <p class="movie-card-description">
            ${movieInfo.overview.substring(0, 150)}
            ${movieInfo.overview.length > 150 ? "..." : ""}
          </p>
          <p class="movie-card-vote">평점 : ${movieInfo.vote_average}</p>`
        : ``
    }
  `;

  render();
  bindEvents();

  return {
    element: $this,
    render,
  };

  function render() {
    $this.innerHTML = innerHTMLTemplate();
  }

  function bindEvents() {
    $this.addEventListener("mouseenter", () => {
      isHover = true;
      render();
    });
    $this.addEventListener("mouseleave", () => {
      isHover = false;
      render();
    });
  }
}
