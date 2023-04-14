const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bl = require("../BLL/usersBLL");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await bl.getByUserName(username);

    if (!(user.password === password) || !password) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
        password,
      },
      "secret"
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    if (error.message.startsWith("User")) {
      res.status(404).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

router.post("/verify", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(404).json({ auth: false, msg: "no token provided" });
  }

  jwt.verify(token, "secret", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ auth: false, msg: "Invalid Token" });
    }

    return res.status(200).json({ auth: true, token: decodedToken });
  });
});

module.exports = router;
