const API_URL = 'https://api.unsplash.com/search/photos?client_id=CLIENT_ID_HERE';
const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.getElementById('loadingImage');
const imageSection = document.querySelector('.images');
const prevPage = document.querySelector('.previouspage');
const nextPage = document.querySelector('.nextpage');
let page = 1;

loadingImage.style.display = 'none'; //default loading is off

form.addEventListener('submit', (event) => {
  page = 1;
  formSubmitted(event);
});
prevPage.addEventListener('click', (event) => {
  page--;
  if(page<1) page=1;
  formSubmitted(event);
});
nextPage.addEventListener('click', (event) => {
  page++;
  formSubmitted(event);
});


function formSubmitted(event) { 
  event.preventDefault(); //prevent refresh on btn click
  //console.log(page);
  let searchTerm = input.value;  
  
  searchStart();                    //show loading image, hide results
  search(searchTerm, page)                //fetch returna promise
    .then(displayImages)
    .then(() => {
      loadingImage.style.display = 'none';
    });
}

function searchStart() {
  loadingImage.style.display = '';
  imageSection.innerHTML = '';
}

function search(searchTerm, page) {
  const url = `${API_URL}&query=${searchTerm}&page=${page}`;
  return fetch(url)
    .then(response => response.json()) //parse
    .then(result => {
      return result.results;  //api is weird has a results array nested
    });
}

function displayImages(images) {
  images.forEach(image => {
    const imageElement = document.createElement('img');
    imageElement.src = image.urls.regular;
    imageSection.appendChild(imageElement);
  });
}