import React, {ChangeEvent, useEffect} from "react";
import {
  setCity,
  selectCity,
  processTurn,
  getMessages,
  currentTurn,
  getMaxTurns,
  setTour,
} from "../../reducers/game";
import {Dropdown, MessageBoard, Skyline, Tour} from "../../components";
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
    dispatch(setTour("city"));
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
            id="cityDropdown"
          />
        </div>
      )}
      <MessageBoard messages={messages} />
      <Tour section="city" />
    </div>
  );
};

export default City;
