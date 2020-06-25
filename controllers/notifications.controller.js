const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");

const SECRET = process.env.JWT_SECRET;

const getNotifications = (req, res) => {
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
};

const readNotifications = (req, res) => {
  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) res.sendStatus("403");

    let user = await User.findById(auth.user._id);

    if (user.password === auth.user.password) {
      Notification.findByIdAndUpdate(req.body.notificationID, {
        $set: { read: true },
      })
        .then((response) => {
          res.send(response);
        })
        .catch((e) => {
          res.send(e);
        });
    } else {
      res.sendStatus("403");
    }
  });
};

module.exports = {
  getNotifications,
  readNotifications,
};
