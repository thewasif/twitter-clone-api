const route = require("express").Router();
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
let Tweet = require("../models/tweet.model");
const verifyToken = require("../helpers/verifyToken");
const upload = require("../config/multer");
const {
  signup,
  login,
  editInfo,
  getUser,
  verifyAuth,
  uploadRoute,
  follow,
  unfollow,
} = require("../controllers/auth.controller");

let SECRET = process.env.JWT_SECRET;

// get detail about a user
route.get("/", getUser);

// post signup data to register a new user
route.post("/signup", signup);

// post login data to login
route.post("/login", login);

// post data such as bio, name etc
route.post("/editprofile", verifyToken, editInfo);

// verify user auth
route.get("/verify", verifyAuth);

// upload photos for a profile
route.post("/upload", verifyToken, upload.array("image"), uploadRoute);

// Follow a user
route.post("/follow", verifyToken, follow);

//Unfollow a user
route.post("/unfollow", verifyToken, unfollow);

route.get("/randomuser", async (req, res) => {
  let users = await User.aggregate([{ $sample: { size: 2 } }]);
  res.send(users);
});

route.get("/search", async (req, res) => {
  let query = req.query.q;
  let users = await User.find({ $text: { $search: query } });
  res.send(users);
});

module.exports = route;
