const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  text: String,
  hearts: Array,
  retweets: Array,
  replies: Array,
  time: Date,
  userID: String,
  repliedTo: mongoose.Schema.Types.ObjectId,
});

tweetSchema.index({ text: "text" });
let Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
