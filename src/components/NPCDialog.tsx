import React from "react";
import {NPCImages} from "../util";
import {NPCImageName} from "../util/types";

const NPCDialog = ({
  dialogue,
  image,
  id,
}: {
  dialogue: string;
  image: NPCImageName;
  id?: string;
}) => {
  return (
    <div className="npc-dialog" id={id}>
      <img src={NPCImages[image]} className="pic-small br-2" alt="" />
      <div className="dialog-text">
        <p className="p-0 m-0">{dialogue}</p>
      </div>
    </div>
  );
};

export default NPCDialog;
