const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  created_at: {type: Date, default: Date.now},
});

const Movie = mongoose.model("Movie", MovieSchema);

Movie.count({}, function(err, count) {
  if (err){
    throw err;
  }
  if (count > 0 )return;
  const movies = require('./movie.seed.json');
  Movie.create(movies, function(err, newMovies) {
    if (err){
      throw err;
    }
    console.log("DB Seeded")
  });
});

module.exports = Movie;
