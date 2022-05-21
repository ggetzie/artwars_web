import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getTour} from "../reducers/game";
import {setIndex} from "../reducers/tour";

const Help = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const section = getTour(game);
  return (
    <FontAwesomeIcon
      icon={faQuestionCircle}
      title="Help"
      onClick={() => dispatch(setIndex([section, 0]))}
      className="help-button"
    ></FontAwesomeIcon>
  );
};

export default Help;
