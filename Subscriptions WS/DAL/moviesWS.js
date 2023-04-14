const utils = require("../Utils/Crud");

const getAllMovies = async () => {
  return utils.getAllItems("https://api.tvmaze.com/shows");
};

module.exports = { getAllMovies };
