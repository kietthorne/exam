import express from "express";
const router = express.Router();

const profiles = [
  { id: 1, username: "TuanKiet", fullName: "Phan Tuan Kiet", age: 6 },
  { id: 2, username: "HiHi", fullName: "HiHiHi", age: 30 },
];

// GET /profile/:id
router.get("/:id", (req, res) => {
  const profileId = parseInt(req.params.id);
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) {
    return res.status(404).send({ error: "No profile found" });
  }
  res.send(profile);
});

// POST /profile
router.post("/", (req, res) => {
  const { username, fullName, age } = req.body;
  const profile = { id: profiles.length + 1, username, fullName, age };
  profiles.push(profile);
  res.status(201).send({
    message: "Personal profile has been created successfully",
    profile,
  });
});

// PUT /profile/:id
router.put("/:id", (req, res) => {
  const profileId = parseInt(req.params.id);
  const { fullName, age } = req.body;
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) {
    return res.status(404).send({ error: "No profile found" });
  }
  profile.fullName = fullName;
  profile.age = age;
  res.send({
    message: "Personal profile has been updated successfully",
    profile,
  });
});

// DELETE /profile/:id
router.delete("/:id", (req, res) => {
  const profileId = parseInt(req.params.id);
  const profileIndex = profiles.findIndex((p) => p.id === profileId);
  if (profileIndex === -1) {
    return res.status(404).json({ error: "No profile found" });
  }
  profiles.splice(profileIndex, 1);
  res.send({ message: "Personal profile has been successfully deleted" });
});

export default router;
