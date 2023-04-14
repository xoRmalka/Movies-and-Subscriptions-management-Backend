const utils = require("../Utils/Crud");

const getAllMoviesWithMembers = async () => {
  return utils.getAllItems("http://localhost:8001/subscriptions/");
};

const addMovie = async (movie) => {
  return utils.createItem("http://localhost:8001/subscriptions/movies", movie);
};

const updateMovie = async (id, movie) => {
  return utils.updateItem(
    "http://localhost:8001/subscriptions/movies",
    id,
    movie
  );
};

module.exports = { getAllMoviesWithMembers, addMovie, updateMovie };
