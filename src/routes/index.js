const router = require('express').Router();
const mongoose = require('mongoose');

//DATABASE EXAMPLES
const MOVIES = [
  {id: 'a', title: 'hello.jpg', description: 'Thor'}
];

router.use('/about', function(req, res, next) {
  res.end(`Welcome to MovieTrackr`);
});

//DISPLAY
router.get('/movie', function(require, response, next){
  const movieModel = mongoose.model('Movie');

  movieModel.find({deleted: {$ne: true}}, function (err, movies){
    if (err) {
      console.log(err);
      return response.status(500).json(err);
    }
    response.json(movies);
  });
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
  const Movie = mongoose.model('Movie');
  const movieId = require.params.movieId;
  Movie.findById(movieId, function(err, movie) {
  if (err) {
    console.error(err);
    return response.status(500).json(err);
  }
  if (!movie) {
    return response.status(404).json({message: "Not found"});
  }

  movie.title = require.body.title;
  movie.description = require.body.description;

  movie.save(function(err, savedMovie) {
    if (err) {
      return response.status(500).json(err);
    }
    response.json(savedMovie);
  })
})
});

//DELETE
router.delete('/movie/:movieId', function(require, response, next){
  const Movie = mongoose.model('Movie');
  const movieId = require.params.movieId;
  Movie.findById(movieId, function(err, movie){
    if (err){
      return response.status(500).json(err);
    }
    if(!movie){
      return response.status(404).json({message: "Not found"});
    }
    movie.deleted = true;

    movie.save(function(err, errorMovie) {
      response.json(errorMovie);
    })
  })
});

//EXPORT
module.exports = router;
