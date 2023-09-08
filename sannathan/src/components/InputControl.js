import React, { useEffect, useState } from "react";

const InputControl = ({
  label = "",
  className = "",
  name = "",
  placeholder = "",
  validationMsg = "",
  value = "",
  type,
  autComplete,
  required = false,
  onChange,
  disabled,
  reset,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    setTextValue(value);
  }, [value, reset]);

  // useEffect(() => {
  //   if (required && isFocused) {
  //     setShowValidation(true);
  //   }
  // }, [required, isFocused]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setTextValue(inputValue);
    onChange(inputValue);
  };

  return (
    <>
      <div className="form">
        <label htmlFor={name} className="col-sm-6 mt-3 control-label">
          {label}
        </label>
        <div >
          <div className="">
            <input
              type={type}
              className="form-control"
              placeholder={placeholder}
              value={textValue}
              disabled={disabled}
              name={name}
              onClick={() => {
                setIsFocused(true);
              }}
              onChange={handleChange}
              autoComplete={autComplete}
            />
            {/* {showValidation ? (
              <small id="inputHelp" className="form-text text-muted">
                {validationMsg}
              </small>
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InputControl;
