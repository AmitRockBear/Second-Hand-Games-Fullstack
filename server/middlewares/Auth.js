const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

const verifyToken = async (req, res, next) => {
  const token = await req.headers["x-access-token"];

  if (token == true) {
    const decoded = jwt.verify(token, process.env.secret);
    pool.query(
      "Select username from USERS where username=$1",
      [decoded.username],
      (err, data) => {
        if (err)
          res
            .status(500)
            .json({ auth: false, message: "Failed to authenticate token." });
        if (data.rows.length === 0)
          res.status(401).json({ auth: false, message: "Invalid token." });
        next();
      }
    );
  } else res.json({ auth: false, message: "No token provided." });
};

const userExists = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const userData = await pool.query(
      "SELECT username FROM USERS where username=$1",
      [username]
    );

    const emailData = await pool.query(
      "SELECT email FROM USERS where email=$1",
      [email]
    );
    if (emailData.rows.length != 0 || userData.rows.length != 0)
      res.json({
        auth: false,
        message:
          "The email or username is already in use, please try to use another one.",
      });
    else next();
  } catch (error) {
    res.status(500).json({
      auth: false,
      message: "There was a problem registering the user.",
    });
  }
};

const validateInputs = async (req, res, next) => {
  const { username, email } = req.body;
  if (!username || !email || !req.body.password)
    res.json({
      auth: false,
      message: "Make sure to fill all fields, before submitting",
    });
  if (username.length > 25)
    res.json({
      auth: false,
      message: "The username's length can not be longer than 25 characters",
    });
  if (req.body.password.length < 8)
    res.json({
      auth: false,
      message: "Password's length must be above 7 characters",
    });
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  )
    res.json({
      auth: false,
      message: "Please enter a valid email",
    });
};

module.exports = {
  verifyToken: verifyToken,
  userExists: userExists,
  validateInputs: validateInputs,
};
