import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function HeroUnit() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Welcome
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          This site was especially made by the community as a game archive. Join
          the community
        </Typography>
        <div className={classes.heroButtons}>
          <Box textAlign="center">
            <Button href="/insertGame" variant="contained" color="primary">
              Add your game
            </Button>
          </Box>
        </div>
      </Container>
    </div>
  );
}
