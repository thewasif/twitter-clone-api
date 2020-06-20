const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let notificationsSchema = new Schema({
  username: String,
  link: String,
  client: String,
  text: String,
  time: Date,
  read: Boolean,
});

let Notification = mongoose.model("Notification", notificationsSchema);

module.exports = Notification;
