const express = require("express");
const PORT = 3001;
const app = express();
const db = require("./db");
const bcrypt = require("bcrypt");

app.use(express.json());

app.get("/artists", async (req, res) => {
  const result = await db.query(`SELECT id, name FROM artists`);
  return res.json({ artists: result.rows });
});

app.post("/artists", async (req, res) => {
  const result = await db.query(`
    INSERT INTO artists (name) VALUES ($1)
    RETURNING id, name
  `,
    [req.body.name]
  );
  return res.json({ artist: result.rows[0] });
});

app.post("/register", async (req, res) => {
  const hashedPw = await bcrypt.hash(req.body.password, 12);
  const result = await db.query(`
    INSERT INTO users (email, username, password) VALUES ($1, $2, $3)
    RETURNING email, username, password
  `,
    [req.body.email, req.body.username, hashedPw]
  );
  return res.json({ user: result.rows[0] });
});

app.post("/verify", async (req, res) => {
  const result = await db.query(`
    SELECT email, password FROM users WHERE email=$1
  `, [req.body.email]);
  const user = result.rows[0];
  if (user) {
    const hashedPw = user.password;
    const plaintextPw = req.body.password;
    const result = await bcrypt.compare(plaintextPw, hashedPw);
    if (result) {
      return res.json({ verified: true });
    }
  }
  return res.json({ verified: false });
});

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
