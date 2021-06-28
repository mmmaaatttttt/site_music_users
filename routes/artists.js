const { Router } = require("express");
const db = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const result = await db.query(`SELECT id, name FROM artists`);
  return res.json({ artists: result.rows });
});

router.post("/", async (req, res) => {
  const result = await db.query(
    `
    INSERT INTO artists (name) VALUES ($1)
    RETURNING id, name
  `,
    [req.body.name]
  );
  return res.status(201).json({ artist: result.rows[0] });
});

module.exports = router;
