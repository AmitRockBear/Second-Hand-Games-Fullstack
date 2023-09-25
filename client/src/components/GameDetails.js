import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import { withRouter } from "react-router-dom";
import { getGameById } from "../actions/GameActions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {
    width: 256,
  },
  helper: {
    display: "inline-block",
    verticalAlign: "middle",
  },
  img: {
    margin: "auto",
    verticalAlign: "middle",
    display: "inline-block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const GameDetails = (props) => {
  const classes = useStyles();

  const [game, setGame] = useState(null);

  useEffect(() => {
    const game_id = props.location.pathname.split("/")[2];
    getGameById(game_id).then((res) => {
      setGame(res);
    });
  }, []);

  if (game == null) return <div></div>;

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <span className={classes.helper} />
              <div className={classes.image}>
                <img
                  className={classes.img}
                  alt="game_image"
                  src={`/files/${game.image_name}`}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="h4"
                    fontWeight="fontWeightBold"
                  >
                    {game.name}{" "}
                    <Chip
                      variant="outlined"
                      color="primary"
                      size="small"
                      label={game.genre}
                    />
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {game.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Released on the year {game.release_date}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default withRouter(GameDetails);
