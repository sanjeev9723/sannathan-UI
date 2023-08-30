import React, { useState } from "react";
import PasswordInput from "../../components/InputControl";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";


function ChangePassword() {
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Additional password validation logic
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/(?=.*[A-Z])/.test(newPassword)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/(?=.*[a-z])/.test(newPassword)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/(?=.*\d)/.test(newPassword)) {
      setError("Password must contain at least one numeric digit.");
      return;
    }
    

    // Call the API or backend service to change the password
    // Reset the form
    localStorage.setItem("password", newPassword);
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(true);


  setTimeout(() => {
    setSuccess(false);
    gotoPage("login"); // Navigate to login page
  }, 2000);
};

  return (
    <div className="form-gap for-box">
      <div className="container d-flex justify-content-center align-items-center  ">
        <div className="col-md-4 col-lg-4 password-box">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
              {success ? (
                  <div className="success-message">
                    <BsCheckCircle className="success-icon" />
                    <div>Password reset successfully.</div>
                  </div>
                ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <h4 className="fw-normal-forgot">New Password</h4>
                  <div className="new-password-box">
                    <p className="new-password">
                      Please create a new password that you don’t use on any
                      other site
                    </p>
                  </div>

                  <div className="password-input-container">
                    <PasswordInput
                      type={showPassword ? "text" : "password"}
                      backgroundColor="white"
                      className={`fas fa-key ${
                        newPassword !== confirmPassword ? "error" : ""
                      }`}
                      onChange={handleNewPasswordChange}
                    />
                    <div
                      className="password-toggle-pass"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                  </div>
                  <div className="password-input-container">
                    <PasswordInput
                      type={showPassword ? "text" : "password"}
                      backgroundColor="white"
                      className={`fas fa-key ${
                        newPassword !== confirmPassword ? "error" : ""
                      }`}
                      onChange={handleConfirmPasswordChange}
                    />
                    <div
                      className="password-toggle-pass"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                  </div>
                  {error && <p className="error-message">{error}</p>}

                  <div className="d-grid gap-2">
                    <button className="btn btn-success newpassword" type="submit">
                      Change
                    </button>
                  </div>
                </form>
              
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
