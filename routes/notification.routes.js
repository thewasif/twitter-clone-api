const route = require("express").Router();
const verifyToken = require("../helpers/verifyToken");
const {
  getNotifications,
  readNotifications,
} = require("../controllers/notifications.controller");

route.get("/", verifyToken, getNotifications);

route.post("/setread", verifyToken, readNotifications);

module.exports = route;
