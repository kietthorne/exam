import express from "express";

import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const profile = await profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).send({ error: "No profile found" });
    }
    if (req.user.username !== profile.username) {
      return res
        .status(403)
        .send({ error: "You do not have permission to access this profile" });
    }
    res.json({ profile });
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while retrieving profile information",
    });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { username, fullName, age } = req.body;
    const profile = new profile({ username, fullName, age });
    await profile.save();
    res
      .status(201)
      .send({ message: "Personal profile has been created successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while creating a personal profile" });
  }
});
