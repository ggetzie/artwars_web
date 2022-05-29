import React, {useState} from "react";
import {
  setGame,
  defaultGame,
  filterArtWorks,
  updateArtwork,
} from "../reducers/game";
import {useAppDispatch} from "../hooks";
import {Dropdown, ScreenHeader} from "../components";
import {Link} from "react-router-dom";
import {ArtWorkFilter} from "../util/awFilter";
import {randInt} from "../util";

const NewGame = () => {
  const dispatch = useAppDispatch();
  let newGame = defaultGame();
  const [name, setName] = useState(newGame.player);
  const [turns, setTurns] = useState(newGame.maxTurns);
  return (
    <div id="new-game-screen">
      <ScreenHeader showBack={true} title="New Game" />
      <div id="new-game-form">
        <div className="form-row">
          <label htmlFor="player-name" className="horizontal-label">
            Name:
          </label>

          <input
            name="player-name"
            type="text"
            value={name}
            className="horizontal-control"
            size={12}
            maxLength={12}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <Dropdown
            labelText="Turns:"
            name="num-turns"
            selectedValue={turns}
            itemList={[5, 30, 50, 75, 100].map((i) => [i, i.toString()])}
            onValueChange={(e) => {
              setTurns(parseInt(e.target.value, 10));
            }}
            labelClass="horizontal-label"
            controlClass="horizontal-control turns"
          />
        </div>
      </div>
      <Link
        title="Start Game"
        to="/game/city"
        className="nav-button"
        onClick={() => {
          if (name === "MoneyBags") {
            newGame.balance = 100_000_000_000;
            newGame.messages = [
              `Cheat code activated! Balance set to $${newGame.balance.toLocaleString()}`,
            ];
          }
          newGame.player = name;
          newGame.maxTurns = turns;
          dispatch(setGame(newGame));
          // select a random artwork under 200k for the player to start with
          const under200k = filterArtWorks(
            newGame,
            new ArtWorkFilter({
              owner: (o) => o === "",
              value: (v) => v <= 200_000,
            })
          );
          const freebie = under200k[randInt(0, under200k.length)];
          dispatch(
            updateArtwork({
              ...freebie.data,
              owner: newGame.player,
              city: "London",
            })
          );
        }}
      >
        Start
      </Link>
      <div className="intro">
        <h3 className="text-center">Welcome to Art Wars!</h3>
        <p>
          Art Wars is a turn-based market simulation game based on the classic{" "}
          <a href="https://en.wikipedia.org/wiki/Drug_Wars_(video_game)">
            Drug Wars
          </a>
          .
        </p>
        <p>
          You play as a globe-trotting art dealer trying to buy art low and sell
          it high while dodging the IRS, looking out for forgeries, stolen or
          looted art, and other hazards of the art market.
        </p>
        <p>
          Enter your name above and choose the number of turns you'd like to
          play, then click Start to begin!
        </p>
      </div>
    </div>
  );
};

export default NewGame;
