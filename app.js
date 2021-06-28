const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const artistRoutes = require("./routes/artists");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/artists", artistRoutes);

app.get("/add/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  return res.json({ total: Number(num1) + Number(num2) });
});

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