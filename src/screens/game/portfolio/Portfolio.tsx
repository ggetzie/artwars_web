import React from "react";
import {Outlet} from "react-router-dom";

import {ScreenHeader} from "../../../components";
import {useAppSelector} from "../../../hooks";
import {portfolioValue} from "../../../reducers/game";

const Portfolio = () => {
  const game = useAppSelector((state) => state.game);
  const totalValue = portfolioValue(game);
  return (
    <div className="tab-main">
      <ScreenHeader
        showBack={false}
        title={`Your Portfolio - $${totalValue.toLocaleString()}`}
      />
      <Outlet />
    </div>
  );
};

export default Portfolio;
