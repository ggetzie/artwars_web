import React from "react";
import {SkylineImages} from "../util";
import {CityName} from "../util/types";

const Skyline = ({city}: {city: CityName}) => {
  return (
    <div className="skyline">
      <img src={SkylineImages[city]} alt={`${city} skyline`} />
    </div>
  );
};

export default Skyline;
