const express = require("express");
const app = express();
const Games = require("./routes/Games");
const Files = require("./routes/File");
const Genres = require("./routes/Genres");
const Auth = require("./routes/Auth");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/games", Games);
app.use("/files", Files);
app.use("/genres", Genres);
app.use("/auth", Auth);

app.listen(2000, () => {
  console.log("Listening to port 2000");
});
