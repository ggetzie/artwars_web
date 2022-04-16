import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div id="main-menu">
      <Link to="/new-game" className="main-menu-button">
        New Game
      </Link>
      <Link to="/continue" className="main-menu-button">
        Continue
      </Link>
      <Link to="/high-scores" className="main-menu-button">
        High Scores
      </Link>
      <Link to="/about" className="main-menu-button">
        About
      </Link>
    </div>
  );
};

export default Home;
