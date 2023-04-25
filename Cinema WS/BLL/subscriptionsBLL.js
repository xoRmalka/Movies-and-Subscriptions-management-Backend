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

const getAllMembersWithMovies = async () => {
  const { data: membersData } = await subscriptionWS.getAllMembersWithMovies();
  return membersData;
};

const updateSubscriptionForMember = async (id, obj) => {
  const { data: subscription } =
    await subscriptionWS.updateSubscriptionForMember(id, obj);
  return subscription;
};

module.exports = {
  getAllMoviesWithMembers,
  addMovie,
  updateMovie,
  deleteMovie,
  getAllMembersWithMovies,
  updateSubscriptionForMember,
};
