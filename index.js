const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "750758ce",
      s: searchTerm,
    },
  });
  console.log("response", response);
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

//Debouncing the input event,so that search starts after user stops typing

const root = document.querySelector(".autocomplete");
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector(".input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }
  resultsWrapper.innerHTML = "";

  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const options = document.createElement("a");
    // if poster === na then (?) assign empty string if not assign poster
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    options.classList.add("dropdown-item");
    options.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;

    options.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      movieSelect(movie);
    });
    document.querySelector(".results").appendChild(options);
  }
};
input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});

const movieSelect = async (movie) => {
  const responses = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "750758ce",
      i: movie.imdbID,
    },
  });
  console.log("secondResponse", responses);
  // return responses.data;
  document.querySelector("#summary").innerHTML = movieTemplate(responses.data);
};

const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
       <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
       <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
       <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMBD Rating</p>
    </article>
       <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMBD Votes</p>
    </article>
  `;
};

// phase 2 secound search for movie code
