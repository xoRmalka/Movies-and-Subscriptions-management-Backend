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
        for (const movie of subscription.movies) {
          const { id, date } = movie;
          const movieData = await movieModel.findById(id);

          if (movieData) {
            moviesWatched.push({
              id: movieData._id,
              name: movieData.name,
              date: date,
            });
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

const updateSubscriptionForMember = async (id, obj) => {
  // Find the subscription document that matches the memberId
  const subscription = await subscriptionModel.findOne({ memberId: id });

  if (!subscription) {
    const member = await memberModel.findById(id);

    if (member) {
      const firstSubscription = {
        memberId: id,
        movies: [obj],
      };

      const subscription = new subscriptionModel(firstSubscription);
      const savedSubscription = await subscription.save();

      return `Movie ${obj.id} added to subscription for member ${id}`;
    } else {
      return `Member with ID ${id} not found`;
    }
  } else {
    // Update the subscription document to add the new movie to the movies array
    await subscriptionModel.updateOne(
      { memberId: id },
      { $push: { movies: obj } }
    );

    return `Movie ${obj.id} added to subscription for member ${id}`;
  }
};

const deleteSubscriptionByMemberId = async (id) => {
  const subscription = await subscriptionModel.findOne({ memberId: id });

  if (!subscription) {
    return new Error(`Subscription with member ID ${id} not found`);
  }

  await subscriptionModel.deleteOne({ memberId: id });

  return `Subscription with member ID ${id} deleted successfully.`;
};

const addMovie = async (obj) => {
  const movie = new movieModel(obj);
  const savedMovie = await movie.save();
  return savedMovie.toObject();
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
  updateSubscriptionForMember,
  deleteSubscriptionByMemberId,
  addMovie,
  deleteMovie,
};

// for each movie if movie id exist in the subscription push member id to array,
//then for each array get the name for the Members collection by ID
