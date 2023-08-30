import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const InputSearch = ({ label, className, onClick, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="form-group MultiSelect1 input-search-container">
      <label
        for="name"
        className="col-xs-6 col-sm-12 col-md-6 col-lg-4 input-search-lable control-label"
      >
        {label}
      </label>
      <div className="form-group col-xs-2 col-sm-12 col-md-6 col-lg-4 ">
        <div className="input-group">
          <input
            className="form-control "
            placeholder={placeholder}
            aria-label="Text input with dropdown button"
            value={inputValue}
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

export default InputSearch;
