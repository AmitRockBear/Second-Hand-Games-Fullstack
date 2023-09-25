const express = require("express")
const router = express.Router()
const upload = require("../config/file.storage")
const { pool } = require("../config/db")
const {
  verifyToken,
  userExists,
  validateInputs,
} = require("../middlewares/Auth")

router.get("/", (req, res) => {
  try {
    console.log("requesting games")
    pool
      .query(
        `SELECT game_id,
        name,
        description, 
        release_date, 
        genres.genre, 
        image_name from games
        inner join genres on games.genre_id = genres.genre_id`
      )
      .then((data) => {
        res.json(data.rows)
      })
  } catch (error) {
    console.log(error.message)
  }
})

router.get("/:game_id", (req, res) => {
  try {
    console.log("requesting game with id " + req.params.game_id)
    pool
      .query(
        `SELECT name,
        description, 
        release_date, 
        genres.genre, 
        image_name from games 
        inner join genres on games.genre_id = genres.genre_id
        where game_id=$1`,
        [req.params.game_id]
      )
      .then((data) => {
        res.json(data.rows[0])
      })
  } catch (error) {
    console.log(error.message)
  }
})

router.post("/insert", [verifyToken, upload.single("file")], (req, res) => {
  try {
    data = JSON.parse({ ...req.body }["body"])
    const { name, description, genre, release_date } = data
    console.log(genre)
    if (Number(release_date) < 1950)
      res
        .status(400)
        .send(
          "The first video game was made on 1950, please make sure you have entered the right year"
        )
    if (description.length > 750)
      res.status(400).send("The description is too long")
    if (typeof req.file == "undefined")
      res
        .status(400)
        .send("Make sure to load an image, before submitting the form")
    const image_name = req.file.originalname + Date.now().toString()
    const { mimetype, buffer } = req.file
    const image_mime_types = ["image/png", "image/jpeg"]
    if (image_mime_types.includes(mimetype)) {
      pool
        .query("INSERT INTO files(type, name, data) VALUES($1, $2, $3)", [
          mimetype,
          image_name,
          buffer,
        ])
        .then(() => {
          console.log("Loading an image to the db was a success")
        })
      pool
        .query(
          "INSERT INTO games(name, description, genre_id, release_date, image_name) VALUES($1, $2, $3, $4, $5) RETURNING *",
          [name, description, genre, release_date, image_name]
        )
        .then((data) => {
          console.log("Adding a game was a success")
          res.json(data.rows[0])
        })
    } else {
      res.status(400).send("Please load an image")
    }
  } catch (err) {
    console.log(err)
    res.json({ msg: "Error", detail: err })
  }
})

router.post("/edit/:id", (req, res) => {
  try {
    console.log("Editing existing game")
    let query = ["UPDATE games SET"]
    let set = []
    let lastIndex = 1
    let values = Object.values(req.body)
    values.push(req.params.id)
    Object.keys(req.body).forEach((key, index) => {
      lastIndex = index + 1
      set.push(key + "=$" + (index + 1))
    })
    query.push(set.join(", "))
    console.log(values)
    pool
      .query(
        query.join(" ") + "WHERE game_id=$" + (lastIndex + 1) + "RETURNING *",
        values
      )
      .then((data) => {
        console.log("Game was successfully edited")
        res.json(data.rows[0])
      })
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router
