const utils = require("../Utils/Crud");

//movies

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

const updateSubscriptionForMember = async (id, obj) => {
  return utils.updateItem(
    "http://localhost:8001/members/subscription",
    id,
    obj
  );
};
const deleteSubscriptionByMemberId = async (id) => {
  return utils.deleteItem("http://localhost:8001/members/subscription", id);
};
module.exports = {
  getAllMoviesWithMembers,
  addMovie,
  updateMovie,
  deleteMovie,
  getAllMembersWithMovies,
  updateSubscriptionForMember,
  deleteSubscriptionByMemberId,
};
