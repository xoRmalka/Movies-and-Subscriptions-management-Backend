const userModel = require("../Models/userModel");
const userFile = require("../DAL/usersFile");
const permissionsFile = require("../DAL/permissionsFile");

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

//Set New User
const setNewUser = async (obj) => {
  const newuser = new userModel({ username: obj.username });
  await newuser.save();

  const userWithId = await getByUserName(obj.username);

  const userForUsersJson = {
    id: userWithId._id,
    firstName: obj.firstName,
    lastName: obj.lastName,
  }; //add date
  // console.log(userForUsersJson);

  await userFile.setUser(userForUsersJson);

  const userForPremissonsJson = {
    id: userWithId._id,
    permissions: obj.permissions,
  };

  await permissionsFile.setUser(userForPremissonsJson);
};

// {
//   "username":"Ormalka",
//   "firstName":"Or",
//   "lastName": "Malka",
//   "permissions":["View Subscriptions","Create Subscriptions"]
//   }

// Get all users
const getAllUsers = async () => {
  const users = await userModel.find({});
  return users;
};

// Get user by username
// * Maybe to split func without password
const getByUserName = async (username) => {
  //add try catch
  try {
    let { _doc: user } = await userModel.findOne({ username: username });
    // Convert the string representation of _id to an ObjectId
    const objectId = new ObjectId(user._id);

    // Get the string representation of the ObjectId
    const objectIdString = objectId.toString();

    // Pass the ObjectId to the getUserById function
    const userData = await userFile.getUserById(objectIdString);
    const userPermissions = await permissionsFile.getUserById(objectIdString);

    user = { ...user, firstName: userData.firstName };
    user = { ...user, lastName: userData.lastName };
    user = { ...user, permissions: userPermissions.permissions };

    if (user) return user;
    //change the opretors
  } catch (error) {
    return error;
  }
};

//Create a new user
const addUser = async (obj) => {
  const user = new userModel(obj);
  await user.save();
  return "Created";
};

//Update existing user
const updateUser = async (username, user) => {
  await userModel.findOneAndUpdate({ username }, user);
  return "Updated";
};

const deleteUser = async (id) => {
  await userModel.findByIdAndDelete(id);
  return "Deleted";
};

module.exports = {
  addUser,
  deleteUser,
  getAllUsers,
  getByUserName,
  updateUser,
  setNewUser,
};
