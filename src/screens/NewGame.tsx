import React, {useState} from "react";
import {setGame, defaultGame} from "../reducers/game";
import {useAppDispatch} from "../hooks";
import {Dropdown, ScreenHeader} from "../components";
import {Link} from "react-router-dom";

const NewGame = () => {
  const dispatch = useAppDispatch();
  let newGame = defaultGame();
  const [name, setName] = useState(newGame.player);
  const [turns, setTurns] = useState(newGame.maxTurns);
  return (
    <div>
      <ScreenHeader showBack={true} title="New Game" />
      <div className="form-row">
        <label htmlFor="player-name" className="horizontal-label">
          Name:
        </label>
        <input
          name="player-name"
          type="text"
          value={name}
          className="horizontal-control"
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
          controlClass="horizontal-control"
        />
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
        }}
      >
        Start
      </Link>
    </div>
  );
};

export default NewGame;
