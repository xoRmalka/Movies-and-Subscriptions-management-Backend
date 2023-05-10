// only for read and wirte check this!

const jsonfile = require("jsonfile");

const file = "./data/users.json";

const getUsers = () => {
  return jsonfile.readFile(file);
};

const getUserById = async (id) => {
  const { users } = await jsonfile.readFile(file);
  const user = users?.find((user) => user.id === id);
  return user;
};

const setUser = async (user) => {
  jsonfile.readFile(file, function (err, obj) {
    if (err) {
      console.error(err);
      return;
    }
    obj.users.push(user);
    jsonfile.writeFile(file, obj, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("created");
    });
  });
};

const updateUserById = async (id, usersData) => {
  try {
    await jsonfile.writeFile(file, usersData);

    console.log(`User with id ${id} updated successfully`);
  } catch (err) {
    console.error(`Error updating user with id ${id}: ${err}`);
  }
};

const deleteUserById = async (id, usersData) => {
  try {
    await jsonfile.writeFile(file, usersData);

    console.log(`User with id ${id} deleted successfully`);
  } catch (err) {
    console.error(`Error deleting user with id ${id}: ${err}`);
  }
};

module.exports = {
  getUsers,
  setUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
