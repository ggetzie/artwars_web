import React from "react";
import {Outlet} from "react-router-dom";

const Portfolio = () => {
  return (
    <div className="tab-main">
      <Outlet />
    </div>
  );
};

export default Portfolio;
