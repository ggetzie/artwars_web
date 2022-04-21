import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faImage,
  faFire,
  faArrowsSpin,
} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "../hooks";
import {
  currentHot,
  portfolioValue,
  selectBalance,
  selectCity,
  selectPlayer,
  currentTurn,
  getMaxTurns,
} from "../reducers/game";
import {getShowBack, getTitle} from "../reducers/header";

import awLogo from "../res/images/aw-logo-square.png";
import backArrow from "../res/images/arrow.png";
import CityIcon from "../res/images/icon-city.png";
import QuitButton from "./QuitButton";
import {Cities} from "../util";
import {CityName} from "../util/types";

const GameHeader = () => {
  const game = useAppSelector((state) => state.game);
  const player = selectPlayer(game);
  const balance = selectBalance(game);
  const artValue = portfolioValue(game);
  const city = selectCity(game);
  const hot = currentHot(game);
  const headerOptions = useAppSelector((state) => state.header);
  const showBack = getShowBack(headerOptions);
  const title = getTitle(headerOptions);
  const showCity = !Object.values(Cities).includes(title as CityName);
  const turn = currentTurn(game);
  const maxTurns = getMaxTurns(game);
  return (
    <div className="game-header">
      <div className="gh-left">
        <img id="header-logo" src={awLogo} alt="Art Wars Logo" />
        {showBack && (
          <img
            id="back-arrow"
            src={backArrow}
            alt="Go Back"
            onClick={() => window.history.back()}
          />
        )}
      </div>
      <div className="gh-center">
        <h2 className="text-center text-upper m-0">{title}</h2>
        <div id="hot-category" title={`${hot} is SO HOT right now!`}>
          <FontAwesomeIcon icon={faFire} color="#f57179" />: {hot}
        </div>
      </div>
      <div className="gh-right">
        <ul className="bare-list">
          <li
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {player}{" "}
          </li>
          <li title="Your cash balance">
            <FontAwesomeIcon icon={faMoneyBill1Wave} color="#5c554b" />: $
            {balance.toLocaleString()}
          </li>
          <li title="Total value of art in your portfolio.">
            <FontAwesomeIcon icon={faImage} color="#f57179" />: $
            {artValue.toLocaleString()}
          </li>
          <li title={`${maxTurns - turn} turns remaining`}>
            <FontAwesomeIcon icon={faArrowsSpin} />: {turn} of {maxTurns}
          </li>
          {showCity && (
            <li title="Current City">
              <img src={CityIcon} alt="City Icon" height={16} width={16} />:{" "}
              {city}
            </li>
          )}
        </ul>
      </div>
      <Link id="quit-button" to="/">
        <QuitButton />
      </Link>
    </div>
  );
};

export default GameHeader;
