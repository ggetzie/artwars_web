import React, {useEffect} from "react";
import {Link, Outlet, useMatch, useResolvedPath} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {
  currentNPC,
  selectCity,
  currentTurn,
  getMaxTurns,
} from "../../reducers/game";
import {saveGame} from "../../util/persist";
import IconCity from "../../res/images/icon-city.png";
import IconPortfolio from "../../res/images/icon-portfolio.png";
import IconCollector from "../../res/images/icon-collector.png";
import IconAuction from "../../res/images/icon-auction.png";
import IconShop from "../../res/images/icon-shop.png";
import {GameHeader, Help} from "../../components";

const GameLink = ({
  to,
  title,
  imgSrc,
  id,
}: {
  to: string;
  title: string;
  imgSrc: string;
  id: string;
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({path: resolved.pathname, end: false});
  return (
    <Link to={to} title={title} className={match ? "active" : ""} id={id}>
      <img src={imgSrc} alt={title} />
    </Link>
  );
};

const Game = () => {
  const game = useAppSelector((state) => state.game);
  const city = selectCity(game);
  const npc = currentNPC(game);
  const turn = currentTurn(game);
  const maxTurns = getMaxTurns(game);

  // save whenever game state updated
  useEffect(() => {
    saveGame(game).catch((err) =>
      console.log(`Error saving ${game.id} - ${err}`)
    );
  }, [game]);

  return (
    <div className="game-container">
      <div className="game-main">
        <GameHeader />
        <Outlet />
        {turn >= maxTurns && (
          <div>
            <Link to="/game-over" title="End Game" className="nav-button">
              End Game
            </Link>
          </div>
        )}
      </div>
      <div className="game-tab" id="gameNav">
        <GameLink
          to="/game/city"
          title={`City - ${city}`}
          imgSrc={IconCity}
          id="cityLink"
        />
        <GameLink
          to="/game/portfolio"
          title="Your Portfolio"
          imgSrc={IconPortfolio}
          id="portfolioLink"
        />
        <GameLink
          to="/game/collector"
          title={`Collector - ${npc.character.name}`}
          imgSrc={IconCollector}
          id="collectorLink"
        />
        <GameLink
          to="/game/auction"
          title="Auction"
          imgSrc={IconAuction}
          id="auctionLink"
        />
        <GameLink
          to="/game/shop"
          title="Power-Up Shop"
          imgSrc={IconShop}
          id="shopLink"
        />
        <Help />
      </div>
    </div>
  );
};

export default Game;
