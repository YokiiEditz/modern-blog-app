const express = require("express");
const router = express.Router();

//schema-models
const User = require("../models/User");
const Post = require("../models/Post");

const jwt = require("jsonwebtoken");

//bcrypt for HASH PASSWORD
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const secret = "d6f54df4d6f3fdsef3";

// routers

//register user
router.post("register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = {
      username: username,
      password: bcrypt.hashSync(password, salt),
    };

    const user = await User.create(data);
    res.status(201).json(user);
    // console.log("register data", user);
  } catch (error) {
    console.log("Register Error!", error.message);
    res.status(400).json({ message: "User not created" });
  }
});

//login user
router.post("login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await User.findOne({ username });

    if (!userData) {
      res.status(400).json({ message: "User not found" });
    }
    // console.log("userdata from server:", userData);

    const passOk = bcrypt.compareSync(password, userData.password);
    // console.log("passOk from server:", passOk);

    if (passOk) {
      // Logged in
      jwt.sign({ username, id: userData._id }, secret, {}, (err, token) => {
        if (err) {
          console.error("Failed to sign JWT:", err);
          res.status(500).json({ message: "Failed to login now!" });
        }

        res.cookie("token", token).json({
          id: userData._id,
          username,
        });
      });
    } else {
      console.log("Wrong credentials");
    }
  } catch (error) {
    console.error("Login error:", error.message);
  }
});

router.get("profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

//get all blogs and also author
router.get("post", async (req, res) => {
  try {
    const data = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(10);

    // console.log("data from server", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("GET Error", error.message);
  }
});

router.get("post/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await Post.findById(id).populate("author", ["username"]);
  res.status(200).json(posts);
});

//create new blog
router.post("post", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "JWT must be provided!!" });
  }

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      res.status(400).json({ message: "Missing required fields" });
    }

    const postData = await Post.create({
      title: title,
      category: category,
      description: description,
      author: info.id,
    });

    res.status(201).json(postData);
  });
});

router.post("logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

module.exports = router;
