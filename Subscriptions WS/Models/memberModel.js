const mongoose = require("mongoose");

const memberModel = new mongoose.Schema(
  {
    name: String,
    email: String,
    city: String,
  },
  { versionKey: false }
);

const MemberModel = mongoose.model("member", memberModel);

module.exports = MemberModel;
