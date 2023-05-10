const express = require("express");
const router = express.Router();

const bl = require("../BLL/subscriptionsBLL");

//Get All Movies With Members
router.get("/movies", async (req, res) => {
  try {
    const moviesData = await bl.getAllMoviesWithMembers();
    res.json(moviesData);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Add Movie
router.post("/movies", async (req, res) => {
  try {
    const movie = req.body;
    const newMovie = await bl.addMovie(movie);
    res.json(newMovie);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Update movie
router.put("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = req.body;
    const updatedMovie = await bl.updateMovie(id, movie);
    res.json(updatedMovie);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Delete a movie by id
router.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bl.deleteMovie(id);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Get All Members With Movies
router.get("/members", async (req, res) => {
  try {
    const membersData = await bl.getAllMembersWithMovies();
    res.json(membersData);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Update subscriptionn
router.put("/subscription/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const updatedSubscription = await bl.updateSubscriptionForMember(id, obj);
    res.json(updatedSubscription);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Delete subscription by member id
router.delete("/subscription/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bl.deleteSubscriptionByMemberId(id);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Update member
router.put("/members/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const updatedMember = await bl.updateMember(id, obj);
    res.json(updatedMember);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Add Member
router.post("/members", async (req, res) => {
  try {
    const member = req.body;
    const newMember = await bl.addMember(member);
    res.json(newMember);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
