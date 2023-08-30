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
    <section class="login">
      <div class="container-fluid">
        <div class="row">
          {/* <!-- form --> */}
          <div class="col-md-4 offset-md-0 offset-sm-0 text-center shadow forgot_bg">
            <div className="text-center">
              {emailSent ? (
                <div className="success-message-forgot">
                  <BsCheckCircle className="success-icon" />
                  <div>
                    {" "}
                    A password reset email has been sent to your email address.
                    .
                  </div>
                </div>
              ) : (
                <form class="form-group" onSubmit={handleSubmit}>
                  <div class="mt-5 font-weight-bold">
                    <h2>Forgot Password</h2>
                  </div>
                  <p class="mt-4">Enter your register email address.</p>
                  <p class="mt-4">
                  <input
                            type="email"
                            name="email"
                            class="form-control"
                            id="inputEmail3"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            required
                            // style={{ backgroundColor: "white" }}
                          />
                    {/* <input
                      type="email"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="Enter your email"
                    /> */}
                  </p>

                  <p class="text-center">
                    <button
                      class="form-control btn login_button shadow"
                      type="submit"
                    >
                      Submit
                    </button>
                  </p>
                  <p class="mt-2">
                    <label
                      class="sign_text"
                      for=""
                      onClick={() => gotoPage("login")}
                    >
                      Back to Sign In
                    </label>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
        <div class="clearfix"> </div>
        {/* <!-- //form --> */}
      </div>
    </section>
  );
}

export default ForgotPassword;
