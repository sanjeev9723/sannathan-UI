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
    <section class="login">
        <div class="container-fluid">
				<div class="row">
					{/* <!-- form --> */}
					<div class="col-md-4 offset-md-0 offset-sm-0 text-center shadow forgot_bg">
          {success ? (
                  <div className="success-message">
                    <BsCheckCircle className="success-icon" />
                    <div>Password reset successfully.</div>
                  </div>
                ) : (
                <form className="form" onSubmit={handleSubmit}>
							
							<div class="mt-5 font-weight-bold">
								<h2>New Password</h2>
							</div>
							<p class="mt-4 new_para">
								Please create a new password that you don’t use on any other site
							</p>
              <div className="password-input-container">
                    <PasswordInput
                      type={showPassword ? "text" : "password"}
                      backgroundColor="white"
                      placeholder="Create password"
                      className={`fas fa-key ${
                        newPassword !== confirmPassword ? "error" : ""
                      }`}
                      onChange={handleNewPasswordChange}
                    />
                     <a class="att_icon">
                      <i
                        className={`fa ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                        onClick={togglePasswordVisibility}
                      ></i>
                    </a>
                  
                  </div>
                  <div className="password-input-container">
                    <PasswordInput
                      type={showPassword ? "text" : "password"}
                      backgroundColor="white"
                      placeholder="Confirm password"
                      className={`fas fa-key ${
                        newPassword !== confirmPassword ? "error" : ""
                      }`}
                      onChange={handleConfirmPasswordChange}
                    />
                     <a class="att_icon">
                      <i
                        className={`fa ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                        onClick={togglePasswordVisibility}
                      ></i>
                    </a>
                    {/* {!passwordsMatch && (
                      <div className="text-danger">Passwords do not match.</div>
                    )} */}
               
                  </div>
							{/* <p class="mt-2">
								<input type="password" class="form-control" id="inputEmail3" placeholder="Create password"/><a class="att_icon" ><i class="fa fa-eye"></i></a>
							</p>
							<p class="mt-2">
								<input type="password" class="form-control" id="inputEmail3" placeholder="Confirm password"/><a class="att_icon" ><i class="fa fa-eye"></i></a>
							</p> */}
               {error && <p className="error-message">{error}</p>}
							<p class="mt-3 mb-5 text-center">
							  <button class="form-control btn login_button shadow" type="submit">Change</button>
							</p>
							
						</form>
                )}
					</div>
				</div>				
				<div class="clearfix"> </div>
				{/* <!-- //form --> */}
			</div>
    </section>
  );
}

export default ChangePassword;
