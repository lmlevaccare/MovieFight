const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "750758ce",
      s: searchTerm,
    },
  });
  console.log("response", response)
  if (response.data.Error) {
    return []
  }
 return response.data.Search
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
  
  resultsWrapper.innerHTML = "";
  dropdown.classList.add('is-active');
  for (let movie of movies) {
    const options= document.createElement('a');
    // if poster === na then (?) assign empty string if not assign poster
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    
    options.classList.add('dropdown-item');
    options.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;
   document.querySelector(".results").appendChild(options);
 
  }
};
input.addEventListener("input", debounce(onInput, 500));
