import React, {Dispatch, SetStateAction} from "react";
import {IntegerInput} from ".";

const OfferRow = ({
  placeholder,
  buttonTitle,
  setOutput,
  value,
  submit,
}: {
  placeholder: string;
  buttonTitle: string;
  setOutput: Dispatch<SetStateAction<number>>;
  value: number;
  submit: () => void;
}) => {
  return (
    <div className="row offer-input">
      <IntegerInput
        placeholder={placeholder}
        setNum={setOutput}
        editable={true}
      />
      <button
        title={buttonTitle}
        type="button"
        className="br-2"
        disabled={Number.isNaN(value)}
        onClick={submit}
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default OfferRow;
