const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "750758ce",
        s: searchTerm
    },
  });

  console.log(response.data);
};

//Debouncing the input event,so that search starts after user stops typing.
const input = document.querySelector('input');
let timeoutId;
const onInput = (e) => {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId=setTimeout(() => {
        fetchData(e.target.value);  
    }, 3000)
  
};

input.addEventListener('input',onInput)


  

console.log()

