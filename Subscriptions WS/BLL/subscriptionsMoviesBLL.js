const subscriptionModel = require("../Models/subscriptionModel");
const memberModel = require("../Models/memberModel");
const movieModel = require("../Models/movieModel");

const getAllMoviesWithMembers = async () => {
  const subscriptions = await subscriptionModel.find({});
  const movies = await movieModel.find({});

  // const firstTenMovies = movies.slice(0, 20);

  const moviePromises = movies.map(async (movie) => {
    const movieId = movie._id.toString();

    const membersWhoWatched = [];

    const memberPromises = subscriptions.map(async (subscription) => {
      const member = await memberModel.findOne({ _id: subscription.memberId });

      if (member) {
        const movieWatched = subscription.movies.find(
          (movie) => movie.id === movieId
        );

        if (movieWatched) {
          membersWhoWatched.push({
            memberId: member._id,
            name: member.name,
            date: movieWatched.date,
          });
        }
      }
    });

    await Promise.all(memberPromises);

    if (membersWhoWatched.length > 0) {
      movie = {
        ...movie.toObject(),
        membersWhoWatched,
      };
    }

    return movie;
  });

  const moviesWithMembers = await Promise.all(moviePromises);

  return moviesWithMembers;
};

const addMovie = async (obj) => {
  const movie = new movieModel(obj);
  const savedMovie = await movie.save();
  return savedMovie.toObject();
};

const updateMovie = async (id, obj) => {
  const movie = await movieModel.findById(id);

  if (!movie) {
    return new Error(`Movie with id ${id} not found`);
  }

  await movie.updateOne(obj);
  return "Movie updated successfully.";
};

const deleteMovie = async (id) => {
  const movie = await movieModel.findById(id);

  if (!movie) {
    return new Error(`Movie with id ${id} not found`);
  }

  // delete the movie from all subscriptions that have it in their movies array
  await subscriptionModel.updateMany(
    { movies: { $in: [id] } },
    { $pull: { movies: id } }
  );

  // delete the movie from the movieModel
  await movieModel.findByIdAndDelete(id);

  return "Movie deleted successfully from both movieModel and subscriptionModel.";
};

module.exports = {
  getAllMoviesWithMembers,
  addMovie,
  updateMovie,
  deleteMovie,
};
