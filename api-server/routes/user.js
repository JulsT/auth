const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/users/me", auth, async (req, res) => {
  const payload = req.decoded;
  const user = await User.findOne({ _id: payload._id });
  if (!user) {
    throw new Error("No user in db");
  }
  res.json(user);
});

router.put("/users/me", async (req, res) => {
  try {
    const user = req.body.data;
    User.findOneAndUpdate(
      { _id: req.body._id },
      user,
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        res.status(200).json(doc);
      }
    );
  } catch (error) {
    res.status(400).json({ error: "error in editing user" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(422).json({ error: "User already exist!" });
    }
    res.status(400).json(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.loginUser(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/users/logout", (req, res) => {
  res.json({ message: "You are now logged out" });
});

module.exports = router;
