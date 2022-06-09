import React, {Dispatch, SetStateAction} from "react";
import {IntegerInput} from ".";

const OfferRow = ({
  placeholder,
  buttonTitle,
  setOutput,
  value,
  submit,
  inputId,
  buttonId,
  disabled = false,
}: {
  placeholder: string;
  buttonTitle: string;
  setOutput: Dispatch<SetStateAction<number>>;
  value: number;
  submit: () => void;
  inputId?: string;
  buttonId?: string;
  disabled?: boolean;
}) => {
  return (
    <div className="offer-input">
      <IntegerInput
        id={inputId}
        placeholder={placeholder}
        setNum={setOutput}
        editable={true}
      />
      <button
        id={buttonId}
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
