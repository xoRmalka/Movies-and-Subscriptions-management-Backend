const userModel = require("../Models/userModel");
const userFile = require("../DAL/usersFile");
const permissionsFile = require("../DAL/permissionsFile");

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

// Set New User
const setNewUser = async (obj) => {
  const newuser = new userModel({ username: obj.username });
  await newuser.save();

  const userWithId = await userModel.findOne({ username: obj.username });

  if (!userWithId) {
    throw new Error(`User ${username} not found`);
  }

  const userForUsersJson = {
    id: userWithId._id,
    firstName: obj.firstName,
    lastName: obj.lastName,
  };

  await userFile.setUser(userForUsersJson);

  const userForPermissionsJson = {
    id: userWithId._id,
    permissions: obj.permissions,
  };

  await permissionsFile.setUser(userForPermissionsJson);

  // Get the extended user data
  const newUser = await getByUserName(obj.username);
  return newUser;
};

// Create a new user
const addUser = async (obj) => {
  const user = new userModel(obj);
  await user.save();
  return "Created";
};

// Get all users
const getAllUsers = async () => {
  const users = await userModel.find({});
  const usersdata = await Promise.all(
    users.map(async (user) => {
      const usersData = await getByUserName(user.username);
      return usersData;
    })
  );
  return usersdata;
};

// Get user by username
const getByUserName = async (username) => {
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      throw new Error(`User ${username} not found`);
    }

    const objectId = new ObjectId(user._id);
    const objectIdString = objectId.toString();
    const usersData = await userFile.getUserById(objectIdString);

    const userPermissions = await permissionsFile.getUserById(objectIdString);

    const extendedUser = {
      ...user?._doc,
      firstName: usersData?.firstName,
      lastName: usersData?.lastName,
      permissions: userPermissions?.permissions,
    };

    return extendedUser;
  } catch (error) {
    // throw new Error(`Failed to get user ${username}: ${error.message}`);
    throw new Error(`User ${username} not found`);
  }
};

// Update existing user
const createUser = async (username, user) => {
  await userModel.findOneAndUpdate({ username }, user);
  return "Updated";
};

const updateUser = async (id, updates) => {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    // Update user in DB
    await userModel.findOneAndUpdate(
      { _id: id },
      { $set: { username: updates.username } }
    );

    // Update user in permissions.json file
    const permissionsData = await permissionsFile.getUsers();
    const permissionIndex = permissionsData.permissions.findIndex(
      (permission) => permission.id === id
    );
    if (permissionIndex === -1) {
      throw new Error(`Permission with id ${id} not found`);
    }

    const updatedPermissions = {
      id: id,
      permissions: updates.permissions,
    };

    permissionsData.permissions[permissionIndex] = updatedPermissions;

    await permissionsFile.updateUserById(id, permissionsData);

    // Update user in users.json file
    const usersData = await userFile.getUsers();
    const userIndex = usersData.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    const updatedUser = {
      id: id,
      firstName: updates.firstName,
      lastName: updates.lastName,
    };

    usersData.users[userIndex] = updatedUser;

    await userFile.updateUserById(id, usersData);

    return "Updated";
  } catch (error) {
    throw new Error(`Failed to update user ${id}: ${error.message}`);
  }
};

// Delete user
const deleteUser = async (id) => {
  try {
    await userModel.deleteOne({ _id: id });

    const usersData = await userFile.getUsers();
    const userIndex = usersData.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    usersData.users.splice(userIndex, 1);

    const permissionsData = await permissionsFile.getUsers();
    const permissionIndex = permissionsData.permissions.findIndex(
      (permission) => permission.id === id
    );
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    permissionsData.permissions.splice(permissionIndex, 1);

    await userFile.deleteUserById(id, usersData);
    await permissionsFile.deleteUserById(id, permissionsData);
    return "Deleted";
  } catch (err) {
    console.error(err);
    return "Error deleting user";
  }
};

module.exports = {
  setNewUser,
  getAllUsers,
  getByUserName,
  addUser,
  updateUser,
  deleteUser,
  createUser,
};
