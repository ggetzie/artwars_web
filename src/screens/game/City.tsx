import React, {ChangeEvent} from "react";
import {
  setCity,
  selectCity,
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
            itemList={Object.values(Cities)
              .filter((c) => c !== city)
              .map((v) => [v, v])}
            onValueChange={onValueChange}
            labelText="Change City:"
            name="city-select"
            labelClass="sr-only"
            controlClass="city-select"
            placeHolder="Change City"
          />
        </div>
      )}
      <div className="row mt-0 mb-4">
        <div className="col">
          <p className="m-0 text-center">Cash: ${balance.toLocaleString()}</p>
        </div>
        <div className="col">
          <p className="m-0 text-center">
            Portfolio Value: ${totalValue.toLocaleString()}
          </p>
        </div>
      </div>
      <p className="mt-8 mb-8 text-center">
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
