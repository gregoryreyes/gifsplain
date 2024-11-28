const giphyInput = document.querySelector('input');
const rating = document.querySelector('#rating');
const button = document.querySelector('button');
const imageContainer = document.querySelector('#image-container');

const limit = 10;
let offset = 0;
let lastSearch = '';

giphyInput.addEventListener( 'keypress', ( e ) => {
  
  if ( e.key === 'Enter' ){
    if ( giphyInput.value ) {
      let inputValue = giphyInput.value;
      getGifs( inputValue );
    } else {
      imageContainer.innerHTML = '';
      offset = 0;
    }
  }
});

button.addEventListener( 'click', ( e ) => {
  e.preventDefault();
  let inputValue = giphyInput.value;

  if ( inputValue ) {
    getGifs( inputValue );
  } else {
    imageContainer.innerHTML = '';
    offset = 0;
  }
});

async function getGifs( inputValue ) {
  try {
      const res = await fetch(`${window.location.href}getgif?inputValue=${inputValue}&limit=${limit}&offset=${offset}&rating=${rating}`);

      allImageUrls = await res.json();

      if ( inputValue != lastSearch ) {
        imageContainer.innerHTML = '';
      }
      
      for ( let i = 0; i < allImageUrls.length; i++ ) {
        let giphyLink = allImageUrls[i].url;
        let newImgEl = document.createElement('img');
        newImgEl.setAttribute( 'src', giphyLink );
        imageContainer.prepend( newImgEl );
      }
  
      offset += limit;
  
      lastSearch = inputValue;
  } catch (error) {
    throw new Error(error);
  }
}