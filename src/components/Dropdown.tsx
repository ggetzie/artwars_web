import React, {ChangeEventHandler} from "react";

type listItem = [any, string];

const Dropdown = ({
  onValueChange,
  selectedValue,
  itemList,
  name,
  labelText,
  labelClass,
  controlClass,
}: {
  onValueChange: Function;
  selectedValue: any;
  itemList: listItem[];
  name: string;
  labelText: string;
  labelClass?: string;
  controlClass?: string;
}) => {
  return (
    <>
      <label htmlFor={name} className={labelClass}>
        {labelText}
      </label>
      <select
        name={name}
        className={controlClass}
        onChange={onValueChange as ChangeEventHandler<HTMLSelectElement>}
      >
        {itemList.map(([v, l], i) => (
          <option key={i} selected={v === selectedValue}>
            {l}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;