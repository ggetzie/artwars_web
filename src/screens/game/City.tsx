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
  };

  return (
    <div className="city-main">
      <p>Hello, {player}!</p>
      <p>Cash on hand: ${balance.toLocaleString()}</p>
      <p>Portfolio Value: ${totalValue.toLocaleString()}</p>
      <p>
        <span className="hot">{hot}</span> is SO HOT right now!
      </p>

      {turn < maxTurns && (
        <div className="form-row">
          <Dropdown
            selectedValue={city}
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

      <h2>Messages</h2>
      <ul>
        {messages.length > 0 ? (
          messages.map((m, i) => <li key={i}>{m}</li>)
        ) : (
          <li>No new messages</li>
        )}
      </ul>
    </div>
  );
};

export default City;
