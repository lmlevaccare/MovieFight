const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "750758ce",
      s: searchTerm,
    },
  });

 return response.data.Search
};

//Debouncing the input event,so that search starts after user stops typing
const input = document.querySelector("input");

const onInput =  async event => {
  const movies = await fetchData(event.target.value);
  for (let movie of movies) {
    const div = document.createElement('div');
    div.innerHTML = `<img src="${movie.Poster}"/>
    <h1>${movie.Title}`
      ;
    const target = document.getElementById('target')
    target.appendChild(div)
  }
};
input.addEventListener("input", debounce(onInput, 1000));