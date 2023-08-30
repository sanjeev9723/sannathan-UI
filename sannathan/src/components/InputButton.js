import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const InputButton = ({ label, className, onClick, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSelect = (selectedValue) => {
    setInputValue(selectedValue); // Update inputValue state when a value is selected
  };
  return (
    <div className="form-group">
      <label for="name" className="cols-sm-2 control-label">
        {label}
      </label>
      <div className="cols-sm-10">
        <div className="input-group">
          <input
            className="form-control "
            placeholder={placeholder}
            aria-label="Text input with dropdown button"
            value={inputValue} // Bind the inputValue state to the input value
            readOnly
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              onClick={onClick}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputButton;
