const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bl = require("../BLL/usersBLL");

router.post("/login", async (req, res) => {
  // get the username and the password from the request
  const { username, password } = req.body;

  // check if theres a user with that username in the array
  // if there is a user, save it inside the user variable
  const user = await bl.getByUserName(username);

  // if there is no user with that username, return an error
  if (!user) return res.status(404).json({ msg: "user not found" });

  // check the user password with the password from the request body
  // if no - return an err
  if (!(user.password === password) || !password)
    return res.status(401).json({ msg: "Invalid Credentials" });

  // otherwise, return a web token created by JWT
  const token = jwt.sign(
    {
      username: user.username,
      id: user.id,
      password,
    },
    "secret"
  ); // {expiresIn: 30} after the ,

  res.status(200).json({ token });
});

router.post("/verify", (req, res) => {
  const { token } = req.body;

  if (!token)
    return res.status(404).json({ auth: false, msg: "no token provided" });

  jwt.verify(token, "secret", (err, decodedToken) => {
    if (err) return res.status(401).json({ auth: false, msg: "Invalid Token" });

    return res.status(200).json({ auth: true, token: decodedToken });
  });
});

module.exports = router;
