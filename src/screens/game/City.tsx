import React, {ChangeEvent} from "react";
import {
  setCity,
  selectCity,
  selectPlayer,
  selectBalance,
  currentHot,
  portfolioValue,
  processTurn,
  getMessages,
  currentTurn,
  getMaxTurns,
} from "../../reducers/game";
import {Dropdown} from "../../components";
import {Cities} from "../../util";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {CityName} from "../../util/types";

const City = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const city = selectCity(game);
  const player = selectPlayer(game);
  const balance = selectBalance(game);
  const hot = currentHot(game);
  const totalValue = portfolioValue(game);
  const messages = getMessages(game);
  const turn = currentTurn(game);
  const maxTurns = getMaxTurns(game);
  const onValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCity(e.target.value as CityName));
    dispatch(processTurn());
    e.target.value = "";
  };

  return (
    <div className="city-main">
      <h2 className="city-heading">{city}</h2>
      {turn < maxTurns && (
        <div className="city-select-container">
          <Dropdown
            selectedValue=""
            itemList={Object.values(Cities).map((v) => [v, v])}
            onValueChange={onValueChange}
            labelText="Change City:"
            name="city-select"
            labelClass="sr-only"
            controlClass="city-select"
            placeHolder="Change City"
          />
        </div>
      )}
      <p>Hello, {player}!</p>
      <p>Cash on hand: ${balance.toLocaleString()}</p>
      <p>Portfolio Value: ${totalValue.toLocaleString()}</p>
      <p>
        <span className="hot">{hot}</span> is SO HOT right now!
      </p>

      <div className="message-board">
        <h3>Message Board</h3>
        <ul className="message-list">
          {messages.length > 0 ? (
            messages.map((m, i) => <li key={i}>{m}</li>)
          ) : (
            <li>No new messages</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default City;
