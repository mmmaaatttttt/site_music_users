const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const artistRoutes = require("./routes/artists");
const mathRoutes = require("./routes/math");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/artists", artistRoutes);
app.use("/", mathRoutes);

app.get("/", (req, res) => {
  return res.json({ ping: "pong" });
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status }
  });
});

module.exports = app;