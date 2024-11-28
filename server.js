require('dotenv').config();
const express = require( 'express' );
const app = express();
const logger = require('morgan');

const port = process.env.PORT || 8081;
const giphyUrl = process.env.GIPHY_URL;
const apiKey = process.env.API_KEY;

// -- Start Middleware
// Initialize the main project folder
app.use( express.static( 'public' ) );

app.use( logger('dev') );
// -- End Middleware




// GET routes
app.get( '/', function( req, res ){
  res.send('where in the world is... Carmen Sandiego');
});

app.get( '/getgif', async function(req, res) {
  const inputValue = req.query.inputValue;
  const limit = req.query.limit;
  const offset = req.query.offset;
  const rating = req.query.rating;
  const url = `${giphyUrl}/v1/gifs/search?api_key=${apiKey}&q=${inputValue}&limit=${limit}&offset=${offset}&rating=${rating}`;

  try {
    const gifResult = ( await fetch(url) ).json()
    .then( data => {
      const imgUrl = [];

      for ( let i = 0; i < data.data.length; i++ ){
        data.data[i].images.fixed_height_small.url
        imgUrl.push( { 'url': data.data[i].images.fixed_height_small.url} );
      }

      // res.json( data.data );
      res.json( imgUrl );
    });
  } catch (error) {
    res.send(error).status(404);
  }

});

// Setup Server
app.listen( port, () => {
  console.log( `Server running on port ${port}` );
});