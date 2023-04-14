const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", userModel);

module.exports = UserModel;
