const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const http = require("http");
require("dotenv").config();
const auth = require("./routes/auth.routes");
const tweet = require("./routes/tweet.routes");
const notifications = require("./routes/notification.routes");
const Tweet = require("./models/tweet.model");

const app = express();

// Middlewares
app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(
  session({
    secret: "hT5doL2wA9_fsW1Anfa",
    saveUninitialized: true,
    resave: false,
  })
);

// Connect Database
mongoose
  .connect(
    "mongodb+srv://m_wasif:say_my_name@sandbox-18w4u.mongodb.net/test?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("👌 Database Connected..");
  })
  .catch((err) => {
    if (err) {
      console.log("❌ ERROR WHILE CONNECTING TO DATABASE: ", err);
    }
  });

const server = http.createServer(app);

const io = socketio(server);
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// Routes
app.use("/api/user", auth);
app.use("/api/tweet", tweet);
app.use("/api/notifications", notifications);

app.get("/", (req, res) => {
  res.send(req.session);
});

// Host
let PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
