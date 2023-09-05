import React from "react";

const GenderInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className=" gender">
      <label>Gender</label>
      <div className="form-check form-check-inline mx-2">
        <label className="male-radio">
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={value === "Male"}
            onChange={handleChange}
          />
          Male
        </label>
        <label className="form-check form-check-inline mx-2">
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={value === "Female"}
            onChange={handleChange}
          />
          Female
        </label>
      </div>
      
    </div>
  );
};

export default GenderInput;
