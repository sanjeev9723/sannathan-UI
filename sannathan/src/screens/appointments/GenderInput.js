import React from "react";

const GenderInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="form-group gender">
      <label className="mt-3  mb-2">Gender</label>
      <div className=" mx-1">
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
        <label className="female-radio ms-2">
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
