let selectInput = document.getElementById("genre");
const filter = document.getElementById("title");
const listItems = [];

const filterItems = [
  0, 2, 4,7, 8, 11, 13, 14, 15, 22, 24, 26, 27, 31, 33, 36, 37, 38, 39, 43, 50,
  53, 56, 57, 65, 66, 67, 71, 73, 76, 83, 86, 93, 95, 96, 100, 102, 105, 108,
  124, 125, 127, 131, 137, 139, 142, 144,
];

selectInput.addEventListener("change", (e) => {
  filterData(e.target.value);
});

filter.addEventListener("keydown", (e) => {
  filterData(filter.value);
});

function filterData(inputValue) {
  listItems.forEach((item) => {
    let html = item.innerHTML.toLowerCase();
    let value = inputValue.toLowerCase();
    if (html.includes(value)) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

async function fetchMoviesJSON(url) {
  const response = await fetch(url);
  const movies = await response.json();
  return movies;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchMoviesJSON(
    "https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json"
  ).then(({ movies, genres }) => {
    console.log(genres);
    let select = document.getElementById("genre");
    genres.forEach((genre) => {
      let option = document.createElement("option");
      option.classList.add("option");
      option.value = genre;
      option.textContent = genre;
      select.appendChild(option);
    });

    let lista = document.getElementById("lista");
    movies.forEach((movie, index) => {
      if (!filterItems.includes(index)) {
        let movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        let movieHeader = document.createElement("div");
        movieHeader.classList.add("movie-header");

        
        movieHeader.style.background = `url('${movie.posterUrl}')`;

        movieHeader.style.backgroundPosition = "100% 80%";
        movieHeader.style.backgroundSize = "cover";
        movieCard.appendChild(movieHeader);

        let movieContent = document.createElement("div");
        movieContent.classList.add("movie-content");

        let movieContentHeader = document.createElement("div");
        movieContentHeader.classList.add("movie-content-header");
        movieContent.appendChild(movieContentHeader);

        movieCard.appendChild(movieContent);

        let movieTitle = document.createElement("h3");
        movieTitle.classList.add("movie-title");
        movieTitle.textContent = movie.title;

        let movieGenres = document.createElement("p");
        movieGenres.classList.add("movie-genre");
        movieGenres.textContent = movie.genres.join(', ');

        movieContentHeader.appendChild(movieTitle);

        let imax = document.createElement("div");
        imax.classList.add("imax-logo");
        movieContentHeader.appendChild(imax);

        let movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");

        movieContent.appendChild(movieInfo);
        movieContent.appendChild(movieGenres);

        let infoSection = document.createElement("div");
        infoSection.classList.add("info-section");
        movieInfo.appendChild(infoSection);
        listItems.push(movieCard);
        lista.appendChild(movieCard);
      }
    });
  });
});
