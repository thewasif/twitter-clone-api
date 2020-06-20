const route = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const verifyToken = require("../helpers/verifyToken");

const SECRET = process.env.JWT_SECRET;

route.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) res.sendStatus("403");

    let user = await User.findById(auth.user._id);

    if (user.password === auth.user.password) {
      let notifications = await Notification.find({
        client: auth.user._id,
      }).sort({ time: -1 });

      res.send(notifications);
    } else {
      res.sendStatus("403");
    }
  });
});

route.post("/setread", verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) res.sendStatus("403");

    let user = await User.findById(auth.user._id);

    if (user.password === auth.user.password) {
      Notification.findByIdAndUpdate(req.body.notificationID, {
        $set: { read: true },
      })
        .then((response) => {
          console.log(response);
          res.send(response);
        })
        .catch((e) => {
          res.send(e);
        });
    } else {
      res.sendStatus("403");
    }
  });
});

module.exports = route;
