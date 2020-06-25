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
  search,
  randomuser,
} = require("../controllers/auth.controller");
const { response } = require("express");

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

// Get random user
route.get("/randomuser", randomuser);

// Search by username
route.get("/search", search);

module.exports = route;
