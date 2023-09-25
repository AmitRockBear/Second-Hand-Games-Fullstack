import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SportsEsportsRounded from "@material-ui/icons/SportsEsportsRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { insertNewGame } from "../actions/GameActions";
import { getUserByToken } from "../actions/AuthActions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function InsertGame() {
  const classes = useStyles();

  const [game, setGame] = useState({
    name: "",
    description: "",
    genre: "Adventure",
    release_date: "",
  });

  const [image, setImage] = useState(null);

  const [genres, setGenres] = useState([]);

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    getUserByToken(localStorage.getItem("token")).then((res) => {
      setAuth(res.auth);
      if (!auth) window.location.href = "/signin";
    });
    axios.get("/genres").then((res) => {
      setGenres(res.data.map((genre) => Object.values(genre)[1]).sort());
    });
  }, []);

  const handleChange = (e) => {
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    });
  };

  const insertSubmit = () => {
    if (
      Number(game.release_date) >= 1950 &&
      game.name !== "" &&
      game.description !== ""
    ) {
      axios.get(`/genres/${game.genre}`).then(async (res) => {
        insertNewGame(
          {
            ...game,
            genre: Object.values(res.data)[0],
          },
          image
        );
      });
    } else {
      console.log("Values aren't valid");
    }
  };
  if (genres === []) return null;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SportsEsportsRounded />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add your game
        </Typography>
        <form
          className={classes.form}
          //   action="/insert"
          //   method="post"
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="game_name"
            placeholder="Your game's name"
            inputProps={{ maxLength: 30 }}
            value={game.name}
            onChange={handleChange}
            name="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            multiline
            fullWidth
            name="description"
            value={game.description}
            onChange={handleChange}
            placeholder="Description that describes your game"
            id="game_desciption"
            inputProps={{ maxLength: 750 }}
          />
          <TextField
            id="genre_selection"
            name="genre"
            label="genre"
            value={game.genre}
            onChange={handleChange}
            select
            fullWidth

            // helperText="Please select your game's genre"
          >
            {genres.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="game_release_year"
            placeholder="Releasing year"
            inputProps={{ maxLength: 4 }}
            value={game.release_date}
            onChange={handleChange}
            name="release_date"
          />
          {/* <Button color="primary" variant="contained" component="span">
            Upload Your Game's Image
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
            />
          </Button> */}
          <Button variant="contained" color="primary" component="label">
            {image ? "Image Loaded" : "Upload Image"}
            <input
              accept="image/png,image/jpeg"
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setImage(e.target.files[0]);
              }}
              name="image"
              style={{ display: "none" }}
            />
          </Button>
          <Button
            onClick={insertSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit game
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
}
