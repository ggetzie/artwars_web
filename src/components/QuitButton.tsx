import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const QuitButton = () => (
  <FontAwesomeIcon
    icon={faTimesCircle}
    color={"red"}
    fixedWidth
    className="quit-button"
    size={"lg"}
  />
);

export default QuitButton;
