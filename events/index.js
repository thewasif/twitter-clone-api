const EventEmitter = require("events");
const Notification = require("../models/notification.model");

class Emitter extends EventEmitter {}

const emitter = new Emitter();

emitter.on("follow", (username, client) => {
  let notification = new Notification({
    text: "started following you",
    username: username,
    link: `/${username}`,
    client: client,
    time: new Date(),
    read: false,
  });

  notification
    .save()
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
});

emitter.on("like", (username, tweetID, client) => {
  let notification = new Notification({
    text: "liked you tweet",
    username: username,
    link: `/status/${tweetID}`,
    client: client,
    time: new Date(),
    read: false,
  });

  notification
    .save()
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
});

emitter.on("reply", (username, tweetID, client) => {
  let notification = new Notification({
    text: "replied to your tweet",
    username: username,
    link: `/status/${tweetID}`,
    client: client,
    time: new Date(),
    read: false,
  });

  notification
    .save()
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
});

module.exports = emitter;
