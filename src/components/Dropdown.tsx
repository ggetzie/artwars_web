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
  placeHolder,
  id,
}: {
  onValueChange: ChangeEventHandler<HTMLSelectElement>;
  selectedValue: any;
  itemList: listItem[];
  name: string;
  labelText: string;
  labelClass?: string;
  controlClass?: string;
  placeHolder?: string;
  id?: string;
}) => {
  return (
    <>
      <label htmlFor={name} className={labelClass}>
        {labelText}
      </label>
      <select
        name={name}
        className={controlClass}
        onChange={onValueChange}
        value={selectedValue}
        id={id}
      >
        {placeHolder && (
          <option key={-1} disabled={true} value="">
            {placeHolder}
          </option>
        )}
        {itemList.map(([v, l], i) => (
          <option key={i}>{l}</option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
