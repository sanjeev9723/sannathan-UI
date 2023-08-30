import React, { useState } from 'react';

function PasswordInput({ label, value, onChange }) {
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setError('');
  };

  const validatePassword = () => {
    if (value.length < 8) {
      setError('Password must be at least 8 characters long.');
    } else if (!/[A-Z]/.test(value)) {
      setError('Password must contain at least one uppercase letter.');
    } else if (!/[a-z]/.test(value)) {
      setError('Password must contain at least one lowercase letter.');
    } else if (!/\d/.test(value)) {
      setError('Password must contain at least one digit.');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <label>{label}:</label>
      <input
        type="password"
        value={value}
        onChange={handleInputChange}
        onBlur={validatePassword}
      />
      {error && <p>{error}</p>}
    </div>
  );
}
export default PasswordInput;
