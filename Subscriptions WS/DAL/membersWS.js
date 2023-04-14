const utils = require("../Utils/Crud");

const getAllMembers = async () => {
  return utils.getAllItems("https://jsonplaceholder.typicode.com/users");
};

module.exports = { getAllMembers };
