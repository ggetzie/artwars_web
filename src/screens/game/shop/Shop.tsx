import React from "react";
import {Outlet} from "react-router-dom";

const Shop = () => {
  return (
    <div className="tab-main">
      <Outlet />
    </div>
  );
};

export default Shop;
