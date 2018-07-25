const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  created_at: {type: Date, default: Date.now},
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
