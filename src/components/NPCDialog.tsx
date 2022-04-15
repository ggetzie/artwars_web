import React from "react";
import {NPCImages} from "../util";
import {NPCImageName} from "../util/types";

const NPCDialog = ({
  dialogue,
  image,
}: {
  dialogue: string;
  image: NPCImageName;
}) => {
  return (
    <div style={{flexDirection: "row", marginTop: 5}}>
      <img src={NPCImages[image]} className="pic-small" alt="" />
      <div
        style={{
          flex: 1,
          marginLeft: 3,
          borderStyle: "solid",
          borderColor: "dodgerblue",
          padding: 2,
          borderRadius: 5,
          borderWidth: 1,
        }}
      >
        <p>{dialogue}</p>
      </div>
    </div>
  );
};

export default NPCDialog;
