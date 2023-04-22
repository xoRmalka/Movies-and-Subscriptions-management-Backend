const utils = require("../Utils/Crud");

const getAllMoviesWithMembers = async () => {
  return utils.getAllItems("http://localhost:8001/movies/");
};

const addMovie = async (movie) => {
  return utils.createItem("http://localhost:8001/movies", movie);
};

const updateMovie = async (id, movie) => {
  return utils.updateItem("http://localhost:8001/movies", id, movie);
};

const deleteMovie = async (id) => {
  return utils.deleteItem("http://localhost:8001/movies", id);
};

//members

const getAllMembersWithMovies = async () => {
  return utils.getAllItems("http://localhost:8001/members/");
};

module.exports = {
  getAllMoviesWithMembers,
  addMovie,
  updateMovie,
  deleteMovie,
  getAllMembersWithMovies,
};
