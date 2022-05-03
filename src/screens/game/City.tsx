import React, {ChangeEvent, useEffect} from "react";
import {
  setCity,
  selectCity,
  processTurn,
  getMessages,
  currentTurn,
  getMaxTurns,
} from "../../reducers/game";
import {Dropdown, Skyline} from "../../components";
import {Cities} from "../../util";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {CityName} from "../../util/types";
import {setTitle, setShowBack} from "../../reducers/header";

const City = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const city = selectCity(game);
  const messages = getMessages(game);
  const turn = currentTurn(game);
  const maxTurns = getMaxTurns(game);
  const onValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCity(e.target.value as CityName));
    dispatch(processTurn());
    e.target.value = "";
  };

  useEffect(() => {
    dispatch(setTitle(city));
    dispatch(setShowBack(false));
  }, [city, dispatch]);

  return (
    <div className="city-main">
      <Skyline city={city} />
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
