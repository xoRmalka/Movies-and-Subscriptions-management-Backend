const subscriptionWS = require("../DAL/subscriptionsWS");

const getAllMoviesWithMembers = async () => {
  const { data: moviesData } = await subscriptionWS.getAllMoviesWithMembers();
  return moviesData;
};
const addMovie = async (movie) => {
  const { data: newMovie } = await subscriptionWS.addMovie(movie);
  return newMovie;
};

const updateMovie = async (id, movie) => {
  const { data: updatedMovie } = await subscriptionWS.updateMovie(id, movie);
  return updatedMovie;
};

const deleteMovie = async (id) => {
  const { data: status } = await subscriptionWS.deleteMovie(id);
  return status;
};

module.exports = {
  getAllMoviesWithMembers,
  addMovie,
  updateMovie,
  deleteMovie,
};
