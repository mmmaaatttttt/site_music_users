const express = require("express");
const PORT = 3001;
const app = express();
const authRoutes = require("./routes/auth");
const artistRoutes = require("./routes/artists");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/artists", artistRoutes)

app.get("/add/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  return res.json({ total: Number(num1) + Number(num2) });
});

app.get("/", (req, res) => {
  return res.json({ ping: "pong hi everyone" });
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
