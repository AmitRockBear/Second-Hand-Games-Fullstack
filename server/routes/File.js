const { pool } = require("../config/db");
const express = require("express");
const router = express.Router();
const upload = require("../config/file.storage");

// router.post("/upload", upload.single("file"), (req, res) => {
//   console.log(req.file);
//   const image_name = req.file.originalname + Date.now().toString();
//   const { mimetype, buffer } = req.file;
//   pool
//     .query("INSERT INTO files(type, name, data) VALUES($1, $2, $3)", [
//       mimetype,
//       image_name,
//       buffer,
//     ])
//     .then(() => {
//       res.json({
//         msg:
//           "File uploaded successfully! -> filename = " + req.file.originalname,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({ msg: "Error", detail: err });
//     });
// });

router.get("/:filename", async (req, res) => {
  console.log("req found" + req.params.filename);
  const image_name = req.params.filename;
  const image_data = await pool.query(
    "SELECT data from files where name = $1",
    [image_name]
  );
  res.send(image_data.rows[0].data);
});

module.exports = router;
