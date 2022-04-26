import React, {Dispatch, SetStateAction} from "react";
import {IntegerInput} from ".";

const OfferRow = ({
  placeholder,
  buttonTitle,
  setOutput,
  value,
  submit,
  disabled = false,
}: {
  placeholder: string;
  buttonTitle: string;
  setOutput: Dispatch<SetStateAction<number>>;
  value: number;
  submit: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="offer-input">
      <IntegerInput
        placeholder={placeholder}
        setNum={setOutput}
        editable={true}
      />
      <button
        title={buttonTitle}
        type="button"
        className="br-2"
        disabled={Number.isNaN(value) || disabled}
        onClick={submit}
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default OfferRow;
