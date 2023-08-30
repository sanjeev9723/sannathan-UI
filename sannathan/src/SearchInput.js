import React, { useEffect, useState } from "react";

const SearchInput = ({
  label = "",
  className = "",
  name = "",
  placeholder = "",
  value = "",
  type,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);

  return (
    <>
      <div className="form-group">
        <label for="name" className="cols-sm-2 control-label">
          {label}
        </label>
        <div className="cols-sm-10">
          <div className="input-group">
            <input
              className="form-control "
              type="text"
              value={value}
              onClick={() => {
                setIsFocused(true);
              }}
              onChange={onChange}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
