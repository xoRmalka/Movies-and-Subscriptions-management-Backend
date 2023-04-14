const subscriptionWS = require("../DAL/subscriptionsWS");

const getAllMoviesWithMembers = async () => {
  const { data: moviesData } = await subscriptionWS.getAllMoviesWithMembers();
  return moviesData;
};
const addMovie = async (movie) => {
  const { data: newMovie } = await subscriptionWS.addMovie(movie);
  return newMovie;
};



module.exports = {
  getAllMoviesWithMembers, addMovie
};
