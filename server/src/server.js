require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimiter = require("express-rate-limit");
const slowDown = require("express-slow-down");
const upload = require("./middlewares/upload");

// App Initialization
const app = express();

// App Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.static("public"));
app.use(express.json());

// Rate Limiters
const timeLimit = 1000 * 60;
const maxReq = 100;
const limiter = rateLimiter({
  windowMs: timeLimit,
  max: maxReq * 2,
});
const speedLimiter = slowDown({
  windowMs: timeLimit,
  delayAfter: maxReq,
  delayMs: () => 300,
});

app.use(speedLimiter);
app.use(limiter);

app.use(upload.single("file"));

// Landing Page Route
app.get("/", (req, res) => {
  res.send("API Server for MyMovieList is Up and Running !");
});

// API Routes / Endpoints
app.use("/v1/api/user", require("./routes/user/user.routes"));
app.use("/v1/api/lists", require("./routes/lists/lists.routes"));

// Running the Server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});

module.exports = app;
