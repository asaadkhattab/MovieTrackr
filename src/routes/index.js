const router = require('express').Router();
const mongoose = require('mongoose');

//DATABASE EXAMPLES
const MOVIES = [
  {id: 'a', title: 'hello.jpg', description: 'Thor'}
];


//DISPLAY
router.get('/movie', function(require, response, next){
  response.json(MOVIES);
});


//CREATE
router.post('/movie', function(require, response, next){
  const Movie = mongoose.model('Movie');
  const movieData = {
    title: require.body.title,
    description: require.body.description,
  };

  Movie.create(movieData, function(err, newMovie){
    if(err){
      console.error(err);
      return response.status(500).json(err);
    }
    response.json(newMovie);
  });
});

//READ
router.get('/movie/:movieId', function(require, response, next){
  const { movieId } = require.params;

  const movie = MOVIES.find( entry => entry.id === movieId);
  if (!movie){
    return response.status(404).end(`'${movieId}' not available`);
  }
  response.json(movie);
});

//UPDATE
router.put('/movie/:movieId', function(require,response,next){
  const data = require.body;
  console.log("PUT DATA", data);

  response.end(`Update: '${require.params.movieId}'`)
});

//DELETE
router.delete('/movie/:movieId', function(require, response, next){
  response.end(`Delete: '${require.params.movieId}'`);
});



module.exports = router;
