import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: "Account successfully created" });
  } catch (error) {
    res.status(500).send({ error: "Account creation failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ error: "Tài khoản không tồn tại" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ error: "Wrong password" });
    }
    const token = jwt.sign({ username: user.username }, "secretKey");
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: "Login error" });
  }
});

router.post("/logout", (req, res) => {
  res.send({ message: "Signed out successfully" });
});

export default router;
