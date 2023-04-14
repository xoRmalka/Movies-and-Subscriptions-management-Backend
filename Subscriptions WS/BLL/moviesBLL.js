const moviesWS = require("../DAL/moviesWS");
const movieModel = require("../Models/movieModel");

const getAllMoviesAndSave = async () => {
  const { data: moviesData } = await moviesWS.getAllMovies();

  const filteredMovies = moviesData.map((movie) => ({
    name: movie.name,
    genres: movie.genres,
    image: movie.image.medium,
    premiered: movie.premiered,
  }));

  filteredMovies.map(async (movie) => {
    const movieObj = new movieModel(movie);
    await movieObj.save();
  });

  return "Created";
};
module.exports = {
  getAllMoviesAndSave,
};
