const mongoose = require("mongoose");

const subscriptionModel = new mongoose.Schema(
  {
    memberId: String,
    movies: Array,
  },
  { versionKey: false }
);

const SubscriptionModel = mongoose.model("subscription", subscriptionModel);

module.exports = SubscriptionModel;
