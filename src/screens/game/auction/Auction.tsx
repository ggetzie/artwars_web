import React from "react";
import {Outlet} from "react-router-dom";

const Auction = () => {
  return (
    <div className="tab-main">
      <Outlet />
    </div>
  );
};

export default Auction;
