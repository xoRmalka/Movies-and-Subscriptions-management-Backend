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

// Update Subscription
router.put("/subscription/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newMovie = req.body;
    const status = await bl.updateSubscriptionForMember(id, newMovie);

    if (status === null) res.status(404).send({ msg: "Member not found" });

    res.json(status);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Delete subscription by member ID
router.delete("/subscription/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;
    const subscription = await bl.deleteSubscriptionByMemberId(memberId);

    if (!subscription) {
      res.status(404).send({ msg: "Subscription not found" });
      return;
    }

    res.json({ msg: "Subscription deleted successfully" });
  } catch (e) {
    res.status(500).json(e);
  }
});

// Update member
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await bl.updateMember(id, obj);
    if (result instanceof Error) {
      res.status(404).send({ msg: result.message });
    } else {
      res.json({ msg: result });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Add Member
router.post("/", async (req, res) => {
  try {
    const newMember = req.body;
    const member = await bl.addMember(newMember);
    res.json(member);
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
