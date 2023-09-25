import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroUnit from "./components/HeroUnit";
import CardsGrid from "./components/CardsGrid";
import InsertGame from "./components/InsertGame";
import GameDetails from "./components/GameDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/signup">
            <Navbar />
            <SignUp />
          </Route>
          <Route exact path="/signin">
            <Navbar />
            <SignIn />
          </Route>
          <Route exact path="/insertGame">
            <Navbar />
            <InsertGame />
          </Route>
          <Route exact path="/details/:id">
            <Navbar />
            <GameDetails />
          </Route>
          <Route path="/">
            <Navbar />
            <HeroUnit />
            <CardsGrid />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
