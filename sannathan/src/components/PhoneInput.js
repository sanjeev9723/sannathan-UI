import React from "react";

const MobileInput = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label></label>
      <div>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={onChange}
          placeholder="Mobile Number"
          required
        />
      </div>
    </div>
  );
};

export default MobileInput;
