const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();
const auth = require("./routes/auth.routes");
const tweet = require("./routes/tweet.routes");
const notifications = require("./routes/notification.routes");

const app = express();

// Middlewares
app.use(express.json({ limit: "20mb" }));
app.use(cors());

// Connect Database
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("👌 Database Connected..");
  })
  .catch((err) => {
    if (err) {
      console.log("❌ ERROR WHILE CONNECTING TO DATABASE: ", err);
    }
  });

const server = http.createServer(app);

// Routes
app.use("/api/user", auth);
app.use("/api/tweet", tweet);
app.use("/api/notifications", notifications);

app.get("/", (req, res) => {
  res.send("Server has started 😀");
});

// Host
let PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`👉 listening on http://localhost:${PORT}`);
});
