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
    <div className="npc-dialog">
      <img src={NPCImages[image]} className="pic-small br-2" alt="" />
      <div className="dialog-text">
        <p className="p-0 m-0">{dialogue}</p>
      </div>
    </div>
  );
};

export default NPCDialog;
