import React from "react";
import {Link} from "react-router-dom";
import Logo from "../res/images/aw-logo-square.png";

const Home = () => {
  return (
    <div id="home-screen">
      <div id="home-header" className="row">
        <div id="hh-left" className="col hh-side">
          Art
        </div>
        <div className="col hh-middle">
          <img src={Logo} alt="Art Wars" />
        </div>
        <div id="hh-right" className="col hh-side">
          Wars
        </div>
      </div>
      <div id="main-menu">
        <ul className="bare-list">
          <li>
            <Link to="/new-game" className="main-menu-button">
              New Game
            </Link>
          </li>
          <li>
            <Link to="/continue" className="main-menu-button">
              Continue
            </Link>
          </li>
          <li>
            <Link to="/high-scores" className="main-menu-button">
              High Scores
            </Link>
          </li>
          <li>
            <Link to="/about" className="main-menu-button">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
