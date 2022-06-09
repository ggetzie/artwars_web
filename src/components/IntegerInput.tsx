import React from "react";
import {useAppSelector} from "../hooks";
import {selectDecimal} from "../reducers/settings";

const IntegerInput = ({
  placeholder,
  setNum,
  editable,
  id,
}: {
  placeholder?: string;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  editable?: boolean;
  id?: string;
}) => {
  const settings = useAppSelector((state) => state.settings);
  const decSep = selectDecimal(settings);
  return (
    <input
      id={id}
      placeholder={placeholder}
      disabled={!editable}
      inputMode="numeric"
      onChange={(event) => {
        const cleaned = event.target.value.split(decSep)[0].replace(/\D+/g, "");
        const num = parseInt(cleaned);
        setNum(num);
      }}
    />
  );
};

export default IntegerInput;
