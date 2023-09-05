import React from "react";
import { useState } from "react";

function Select({
  label,
  className,
  name,
  disabled,
  onChange,
   value,
  inputArry = [],
}) {
  const [isFocused, setIsFocused] = useState(false);
  const onSelectChange = (selectedValue) => {
    if (onChange) {
      onChange(selectedValue);
    }
  };
  return (
    <div>
     <div className="form">
        {/* <label for="name" className="cols-sm-2 control-label">
          {label}
        </label> */}
        <div className="cols-sm-10">
          <div className="input-group select-container">
            {/* <span className="input-group-addon">
              <i className={className} aria-hidden="true"></i>
            </span> */}
      <select
        name={name}
        className="form-select select-check"
        value={value}
        // style={{ backgroundColor: "#f9f9f9" }} 
         onClick={() => {
          setIsFocused(true);
        }}
        onChange={(e) => onSelectChange(e.target.value)}
        >
        <option value={inputArry[0]}>{label}</option>
        {inputArry.map((option) => (
          <option value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Select;
