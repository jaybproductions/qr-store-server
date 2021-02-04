const express = require("express");
const router = express.Router();
const axios = require("axios");

const rootURL = "https://chart.googleapis.com/chart?";
router.get("/", (req, res) => {
  res.json("hello");
});

router.get("/newqr/:data", (req, res) => {
  const data = `${rootURL}cht=qr&chs=150x150&chl=${req.params.data}`;
  res.send(data);
});

module.exports = router;
