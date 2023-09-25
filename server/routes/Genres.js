const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

router.get("/", (req, res) => {
  try {
    console.log("requesting all genres");
    pool.query("SELECT * from genres").then((data) => {
      console.log("Values returned");
      res.json(data.rows);
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:genre", (req, res) => {
  try {
    pool
      .query("select genre_id from genres where genre=$1", [req.params.genre])
      .then((data) => {
        res.json(data.rows[0]);
      });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
