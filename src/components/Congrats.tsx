import React from "react";

const Congrats = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <div className="text-center mt-6">
      <h4 className="m-0">Congratulations!</h4>
      {children}
    </div>
  );
};

export default Congrats;
