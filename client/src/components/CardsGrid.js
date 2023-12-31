import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { getAllGames } from "../actions/GameActions";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const CardsGrid = () => {
  const classes = useStyles();

  const [games, setGames] = useState(null);

  useEffect(() => {
    getAllGames().then((res) => {
      setGames(res);
    });
  }, []);

  if (games == null) return <div></div>;
  console.log(games);
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {games.map((game) => (
          <Grid item key={game.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={`/files/${game.image_name}`}
                title={game.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {game.name + " "}
                  <Chip
                    variant="outlined"
                    color="primary"
                    size="small"
                    label={game.genre}
                  />
                </Typography>
                <Typography>{game.description.substr(1, 80) + ".."}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  href={`/details/${game.game_id}`}
                  size="small"
                  color="primary"
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardsGrid;
