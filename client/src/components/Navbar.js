import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Container from "@material-ui/core/Container";
import Indigo from "@material-ui/core/colors/indigo";
import Link from "@material-ui/core/Link";
import { getUserByToken, logOutAction } from "../actions/AuthActions";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const navBack = Indigo[500];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarClass: {
    background: navBack,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getUserByToken(localStorage.getItem("token")).then((res) => {
      setAuth(res.auth);
      if (auth) setUsername(res.username);
    });
  }, [auth]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logOutAction().then((res) => {
      setAuth(res.auth);
      setAnchorEl(null);
    });
  };

  if (auth === null) return null;
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBarClass} position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link href="/" underline="none" color="inherit">
                Gamechive
              </Link>
            </Typography>
            {auth ? (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <VerifiedUser color="primary" fontSize="small" />
                    &nbsp; {username}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button href="/signup" color="inherit">
                  Register
                </Button>
                <Button href="/signin" color="inherit">
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
