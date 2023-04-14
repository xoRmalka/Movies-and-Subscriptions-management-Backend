const express = require("express");

const router = express.Router();

const bl = require("../BLL/subscriptionsBLL");

// Get all
router.get("/", async (req, res) => {
  try {
    const moviesWithMembers = await bl.getAllMoviesWithMembers();
    res.json(moviesWithMembers);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Add movie
router.post("/movies", async (req, res) => {
  try {
    const newMovie = req.body;
    const movie = await bl.addMovie(newMovie);
    res.json(movie);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Get by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // req.params = {id: 23432hu234234}
    const subscription = await bl.getSubscriptionById(id);
    res.json(subscription);
  } catch (e) {
    if (e.kind === "ObjectId") res.status(404).json({ msg: "Not Found", e: e });
    res.status(500).json(e);
  }
});

// Add student
router.post("/", async (req, res) => {
  try {
    const subscription = req.body;
    const status = await bl.addSubscription(subscription);
    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});
// Update student
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // req.params = {id: 23432hu234234}
    const subscription = req.body;
    const status = await bl.updateSubscription(id, subscription);

    if (status === null)
      res.status(404).send({ msg: "Subscription not found" });

    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // req.params = {id: 23432hu234234}
    console.log(id);
    const status = await bl.deleteSubscription(id);
    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
