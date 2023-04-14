const mongoose = require("mongoose");

const movieModel = new mongoose.Schema(
  {
    name: String,
    genres: Array,
    image: String,
    premiered: Date,
  },
  { versionKey: false }
);

const MovieModel = mongoose.model("movie", movieModel);

module.exports = MovieModel;
