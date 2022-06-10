import React from "react";

const OfferText = ({
  value,
  prefix,
  id,
}: {
  value: number;
  prefix: string;
  id?: string;
}) => {
  return (
    <p className="text-center fs-14 text-bold" id={id}>
      {Number.isNaN(value) ? (
        <span className="error">Enter a valid number</span>
      ) : (
        `${prefix} $${value.toLocaleString()}`
      )}
    </p>
  );
};

export default OfferText;
