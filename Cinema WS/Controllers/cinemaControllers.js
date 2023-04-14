const express = require("express");

const router = express.Router();

const bl = require("../BLL/usersBLL");

// Get all
router.get("/", async (req, res) => {
  try {
    const users = await bl.getAllUsers();
    res.json(users);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Get by username
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params; // req.params = {id: 23432hu234234}
    const user = await bl.getByUserName(username);
    res.json(user);
    // } catch (e) {
    //   if (e.kind === "ObjectId") res.status(404).json({ msg: "Not Found", e: e });
    //   res.status(500).json(e);
    // }
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
// create User (להוסיף קידומת לבקשה)
router.put("/:username", async (req, res) => {
  try {
    const { username } = req.params; // req.params = {id: 23432hu234234}
    const user = req.body;
    const status = await bl.createUser(username, user);

    if (status === null) res.status(404).send({ msg: "user not found" });

    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

//update user
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params; // req.params = {id: 23432hu234234}
    const user = req.body;
    const status = await bl.updateUser(id, user);

    if (status === null) res.status(404).send({ msg: "user not found" });

    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

// // Delete student
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // req.params = {id: 23432hu234234}
    console.log(id);
    const status = await bl.deleteUser(id);
    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
