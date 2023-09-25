const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  userExists,
  validateInputs,
} = require("../middlewares/Auth");

router.post("/register", [validateInputs, userExists], (req, res) => {
  try {
    const { username, email } = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    pool.query(
      "INSERT INTO USERS(username, email, password) values($1, $2, $3)",
      [username, email, hashedPassword],
      (err, data) => {
        if (err)
          res.status(500).json({
            auth: false,
            message: "There was a problem registering the user.",
          });

        const token = jwt.sign({ username }, process.env.secret, {
          expiresIn: 86400,
        });

        res.status(200).json({ auth: true, token: token });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/me", verifyToken, (req, res) => {
  // here
  const token = req.headers["x-access-token"];

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err)
      res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    res.status(200).json({ auth: true, username: decoded.username });
  });
});

//Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    res.status({
      auth: false,
      message: "Make sure to fill all fields, before submitting",
    });
  console.log(email);
  pool.query(
    "Select username, password from USERS where email=$1",
    [email],
    (err, data) => {
      if (err)
        res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate user." });
      if (data.rows.length === 0)
        res.json({ auth: false, message: "Invalid credentials" });
      console.log(data.rows);
      if (bcrypt.compareSync(password, data.rows[0].password)) {
        const token = jwt.sign({ username: data.rows }, process.env.secret, {
          expiresIn: 86400,
        });
        res.status(200).json({ auth: true, token: token });
      } else {
        res.json({ auth: false, message: "Invalid credentials" });
      }
    }
  );
});

router.get("/logout", (req, res) => {
  res.status(200).json({ auth: false, token: null });
});

module.exports = router;
