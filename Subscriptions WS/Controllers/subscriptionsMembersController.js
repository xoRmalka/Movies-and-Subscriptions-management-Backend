const express = require("express");

const router = express.Router();

const bl = require("../BLL/subscriptionsMembersBLL");

// Get all Members With Movie
router.get("/", async (req, res) => {
  try {
    const MembersWithMovie = await bl.getAllMembersWithMovies();
    res.json(MembersWithMovie);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Add movie
router.post("/", async (req, res) => {
  try {
    const newMovie = req.body;
    const movie = await bl.addMovie(newMovie);
    res.json(movie);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Update movie
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = req.body;
    const status = await bl.updateMovie(id, updatedMovie);

    if (status === null) res.status(404).send({ msg: "Movie not found" });

    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Delete movie
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await bl.deleteMovie(id);

    if (status === null) res.status(404).send({ msg: "Movie not found" });

    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
