const subscriptionModel = require("../Models/subscriptionModel");
const memberModel = require("../Models/memberModel");
const movieModel = require("../Models/movieModel");

const getAllMoviesWithMembers = async () => {
  const subscriptions = await subscriptionModel.find({});
  const movies = await movieModel.find({});

  const firstTenMovies = movies.slice(0, 20);

  const moviePromises = firstTenMovies.map(async (movie) => {
    const movieId = movie._id.toString();

    const membersWhoWatched = [];

    const memberPromises = subscriptions.map(async (member) => {
      if (member.movies?.includes(movieId)) {
        const memberWhoWatched = await memberModel.findOne({
          _id: member.memberId,
        });

        membersWhoWatched.push(memberWhoWatched);
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

// for each movie if movie id exist in the subscription push member id to array,
//then for each array get the name for the Members collection by ID
