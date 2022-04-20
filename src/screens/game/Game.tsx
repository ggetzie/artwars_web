import React, {useEffect} from "react";
import {Link, Outlet} from "react-router-dom";

// import City from "./City";
// import Portfolio from "./portfolio/";
// import Collector from "./collector";
// import Auction from "./auction/";
// import Shop from "./shop";
import {useAppSelector} from "../../hooks";
import {
  currentNPC,
  selectCity,
  currentTurn,
  getMaxTurns,
  selectPlayer,
} from "../../reducers/game";
import {saveGame} from "../../util/persist";
// import {QuitButton} from "../../components";
import IconCity from "../../res/images/icon-city.png";
import IconPortfolio from "../../res/images/icon-portfolio.png";
import IconCollector from "../../res/images/icon-collector.png";
import IconAuction from "../../res/images/icon-auction.png";
import IconShop from "../../res/images/icon-shop.png";
import {ScreenHeader, QuitButton} from "../../components";

// const ACTIVE_COLOR = "dodgerblue";
// const INACTIVE_COLOR = "gray";

const Game = () => {
  const game = useAppSelector((state) => state.game);
  const player = selectPlayer(game);
  const city = selectCity(game);
  const npc = currentNPC(game);
  const turn = currentTurn(game);
  const maxTurns = getMaxTurns(game);
  console.log(maxTurns);
  console.log(npc);
  console.log(game);

  // save whenever game state updated
  useEffect(() => {
    saveGame(game).catch((err) =>
      console.log(`Error saving ${game.id} - ${err}`)
    );
  }, [game]);

  return (
    <div className="game-container">
      <div className="game-main">
        <ScreenHeader
          showBack={false}
          title={`Art Wars ${player} ${turn} / ${maxTurns}`}
          headerRight={
            <Link to="/" className="quit-button" title="Quit">
              <QuitButton />
            </Link>
          }
        />
        <Outlet />
        {turn >= maxTurns && (
          <div>
            <Link to="/game-over" title="End Game">
              End Game
            </Link>
          </div>
        )}
      </div>
      <div className="game-tab">
        <Link to="/game/city" title={`City - ${city}`}>
          <img src={IconCity} alt={`City - ${city}`} />
        </Link>
        <Link to="/game/portfolio" title="Your Portfolio">
          <img src={IconPortfolio} alt="Your Portfolio" />
        </Link>
        <Link to="/game/collector" title={`Collector - ${npc.character.name}`}>
          <img src={IconCollector} alt={`Collector - ${npc.character.name}`} />
        </Link>
        <Link to="/game/auction" title="Auction">
          <img src={IconAuction} alt="Auction" />
        </Link>
        <Link to="/game/shop" title="Power-Up Shop">
          <img src={IconShop} alt="Power-Up Shop" />
        </Link>
      </div>
    </div>
  );
};

export default Game;
