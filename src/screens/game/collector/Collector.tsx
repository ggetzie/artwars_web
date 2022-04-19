import React from "react";
import {Outlet} from "react-router-dom";
import {ScreenHeader} from "../../../components";
import {useAppSelector} from "../../../hooks";
import {currentNPC} from "../../../reducers/game";

const Collector = () => {
  const game = useAppSelector((state) => state.game);
  const npc = currentNPC(game);
  return (
    <div className="tab-main">
      <ScreenHeader
        showBack={false}
        title={npc.character.name}
        titleClasses="npc-name"
      />
      <Outlet />
    </div>
  );
};

export default Collector;
