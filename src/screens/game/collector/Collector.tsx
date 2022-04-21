import React from "react";
import {Outlet} from "react-router-dom";

const Collector = () => {
  return (
    <div className="tab-main">
      <Outlet />
    </div>
  );
};

export default Collector;
