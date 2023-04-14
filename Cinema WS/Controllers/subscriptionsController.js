const express = require("express");
const router = express.Router();

const bl = require("../BLL/subscriptionsBLL");

router.get("/", async (req, res) => {
  try {
    const moviesData = await bl.getAllMoviesWithMembers();
    res.json(moviesData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/movies", async (req, res) => {
  try {
    const movie = req.body;
    const newMovie = await bl.addMovie(movie);
    res.json(newMovie);
  } catch (e) {
    res.status(500).json(e);
  }
});



module.exports = router;