import React from "react";

const OfferText = ({value, prefix}: {value: number; prefix: string}) => {
  return (
    <p className="text-center fs-14 text-bold">
      {Number.isNaN(value) ? (
        <span className="error">Enter a valid number</span>
      ) : (
        `${prefix} $${value.toLocaleString()}`
      )}
    </p>
  );
};

export default OfferText;
