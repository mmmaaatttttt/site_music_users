const { Router } = require("express");

const router = Router();

router.get("/add/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  return res.json({ total: Number(num1) + Number(num2) });
});

router.get("/multiply/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  return res.json({ total: Number(num1) * Number(num2) });
});

router.get("/subtract/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  return res.json({ total: Number(num1) - Number(num2) });
});

module.exports = router;