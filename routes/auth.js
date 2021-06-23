const bcrypt = require("bcrypt");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = Router();
const SECRET_KEY = process.env.SECRET_KEY || "shhhhh";

router.post("/register", async (req, res) => {
  const hashedPw = await bcrypt.hash(req.body.password, 12);
  const result = await db.query(
    `
    INSERT INTO users (email, username, password) VALUES ($1, $2, $3)
    RETURNING email, username, password
  `,
    [req.body.email, req.body.username, hashedPw]
  );
  const token = jwt.sign({ username: req.body.username }, SECRET_KEY);
  return res.json({ token });
});

router.post("/login", async (req, res) => {
  const result = await db.query(
    `
    SELECT email, password FROM users WHERE email=$1
  `,
    [req.body.email]
  );
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

module.exports = router;
