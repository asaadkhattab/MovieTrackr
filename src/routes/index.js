const router = require('express').Router();
const mongoose = require('mongoose');

//DATABASE EXAMPLES
const MOVIES = [
  {id: '1', title: 'Iron Man', description: 'Tony Stark Builds an Armor'},
  {id: '2', title: 'The Incredible Hulk', description: 'Bruce banner exposed to gamma radiation'},
  {id: '3', title: 'Iron Man 2', description: 'Sequel'},
  {id: '4', title: 'Thor', description: 'Thor must prove himself worthy and reclaim his hammer'},
  {id: '5', title: 'Captain America', description: 'Steve Rogers is transformed to a super-soldier'},
  {id: '6', title: 'The Avengers', description: 'Nick Fury Unites them'}


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
