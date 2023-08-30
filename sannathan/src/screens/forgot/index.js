import React, { useState } from "react";
import InputControl from "../../components/InputControl";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";


function ForgotPassword() {
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!email) {
      // Simulate sending password reset email
      console.log("Sending password reset email to:", email);

      // Set the emailSent state to true to show a confirmation message
      setEmailSent(true);

      // Reset the form
      setEmail("");

      // Simulate an error after 5 seconds
      setTimeout(() => {
        console.log("Error: Failed to send password reset email");
        setEmailSent(false); // Clear the emailSent state to hide the confirmation message
        gotoPage("changepassword");
      }, 2000);
    }
  };

  return (
    <div className="form-gap for-box">
      <div className="container h-100 d-flex justify-content-center align-items-center  ">
        <div className="col-md-4 col-lg-4 forgot-box">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                {emailSent ? (
                  <div className="success-message-forgot">
                    <BsCheckCircle className="success-icon" />
                    <div>
                      {" "}
                      A password reset email has been sent to your email
                      address. .
                    </div>
                  </div>
                ) : (
                  <form className="form" onSubmit={handleSubmit}>
                    <h5 className="text-center forgot">Forgot Password</h5>
                    <p className="text-muted forgot">
                      Enter your registered email address.
                    </p>
                    <div className="panel-body">
                      <div className="form-group">
                        <div className=" input-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="sample@gmail.com"
                            className="form-control"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            required
                            style={{ backgroundColor: "white" }}
                          />
                        </div>
                      </div>
                      <div className="form-group forgot-submit">
                        <button
                          className="btn btn-primary rounded w-100 theme-btn mx-auto"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                      <input
                        type="hidden"
                        className="hide"
                        name="token"
                        id="token"
                        value=""
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <p className="small mb-5">
            <div className="foot-text">
              <p className="text-backsign" onClick={() => gotoPage("login")}>
                Back to Sign In
              </p>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
