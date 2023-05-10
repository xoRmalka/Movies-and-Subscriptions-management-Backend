const express = require("express");

const router = express.Router();

const bl = require("../BLL/usersBLL");

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await bl.getAllUsers();
    res.json(users);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Get By User Name
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await bl.getByUserName(username);
    res.json(user);
  } catch (error) {
    console.log(error);
    if (error.message.startsWith("User")) {
      res.status(404).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

//Set New User
router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const status = await bl.setNewUser(user);
    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});
// Create User
router.put("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = req.body;
    const status = await bl.createUser(username, user);

    if (status === null) res.status(404).send({ msg: "user not found" });

    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Update User
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const status = await bl.updateUser(id, user);

    if (status === null) res.status(404).send({ msg: "user not found" });

    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const status = await bl.deleteUser(id);
    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
