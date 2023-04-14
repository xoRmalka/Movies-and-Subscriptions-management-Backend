const jsonfile = require("jsonfile");

const file = "./data/permissions.json";

const getUsers = () => {
  return jsonfile.readFile(file);
};

// const getUser = (id) => {
//   jsonfile.readFile(file, function (err, obj) {
//     if (err) console.error(err);
//     const user = obj.users.find((u) => u.id === id);
//     if (user) {
//       console.log(user);
//     } else {
//       console.log(`User with id ${id} not found.`);
//     }
//   });
// };

const getUserById = async (id) => {
  const { permissions } = await jsonfile.readFile(file);

  const user = permissions?.find((user) => user.id === id);
  // if (!user) return { permissions: "" };

  return user;
};
const setUser = async (user) => {
  jsonfile.readFile(file, function (err, obj) {
    if (err) {
      console.error(err);
      return;
    }
    obj.permissions.push(user);
    jsonfile.writeFile(file, obj, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("created");
    });
  });
};

const updateUserById = async (id, permissionsData) => {
  try {
    await jsonfile.writeFile(file, permissionsData);
    console.log(`User with id ${id} updated successfully`);
  } catch (err) {
    console.error(`Error updating user with id ${id}: ${err}`);
  }
};

const deleteUserById = async (id, permissionsData) => {
  try {
    await jsonfile.writeFile(file, permissionsData);

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
