const subscriptionModel = require("../Models/subscriptionModel");
const memberModel = require("../Models/memberModel");
const movieModel = require("../Models/movieModel");

const getAllMembersWithMovies = async () => {
  const subscriptions = await subscriptionModel.find({});
  const members = await memberModel.find({});

  const memberPromises = members.map(async (member) => {
    const memberId = member._id.toString();

    const moviesWatched = [];

    for (const subscription of subscriptions) {
      if (subscription.memberId === memberId) {
        for (const movieId of subscription.movies) {
          const movie = await movieModel.findById(movieId);
          if (movie) {
            moviesWatched.push({ id: movie._id, name: movie.name });
          }
        }
      }
    }

    if (moviesWatched.length > 0) {
      member = {
        ...member.toObject(),
        moviesWatched,
      };
    }

    return member;
  });

  const membersWithMovies = await Promise.all(memberPromises);

  return membersWithMovies;
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
  getAllMembersWithMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};

// for each movie if movie id exist in the subscription push member id to array,
//then for each array get the name for the Members collection by ID
