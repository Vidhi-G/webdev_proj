const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const requireAuth = require("../middlewares/RequireAuth");
const router = express.Router();
router.post("/signup", async (req, res) => {
  const { name, email, password, phonenumber } = req.body;
  try {
    const user = new User({ name, email, phonenumber, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "my_secret_key_for_technexus");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(422).send({ error: "Must provide all details" });
    const user = await User.findOne({ email });
    if (!user) return res.status(422).send({ error: "Email not found" });
    try {
      await user.comparePassword(password);
      const token = jwt.sign(
        { userId: user._id },
        "my_secret_key_for_technexus"
      );
      res.send({ token });
    } catch (err) {
      return res.status(422).send({ error: "Invalid details" });
    }
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
router.get("/user/me", requireAuth, async (req, res) => {
  try {
    console.log("Decoded user:", req.user);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});
module.exports = router;
