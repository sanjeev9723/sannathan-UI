import InputControl from "../../components/InputControl";
import  styles from './SignUp.css';
import Select from "../../components/Select.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";
import leaf from "../images/leaf.png";
import flowers from "../images/flowers.png";
import bowl from "../images/bowl.png";
import sannathan from "../images/sannathan.png";
import PhoneInput from "react-phone-input-2";
import PasswordInput from "../../components/InputControl";
import "react-phone-input-2/lib/style.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Carousel } from "react-bootstrap";
import useAxiosPost from "../../api/useAxiosPost";

const Register = ({ onTextChange }) => {
  const navigate = useNavigate();
  const axiosInst = useAxiosPost();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSelectUser = (value) => {
    setSelectUser(value);
  };
  const handleEmail = (value) => {
    setEmail(value);
  };
  const handleUserNameInput = (value) => {
    setUserName(value);
  };
  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleMobileInput = (value) => {
    setMobile(value);
  };

  const handleValidation = async (e) => {
    e.preventDefault();
  
    try {
      if (!!userName && !!newPassword && newPassword === confirmPassword) {
        // Construct user object based on selected user type
        const userRole = selectUser === "Junior Doctor" ? "Admin" : "user";
        const user = {
          "name": userName,
          "email": email,
          "password": newPassword,
          "isDoctor":"true",
          "id": 0,
          "isActive":"1" ,
          "contactnumber": 0,
                  };
  console.log(user);
        // Perform API call to create user
        const response = await axiosInst.post("/admin/createuser", user);
  
        if (response.status === 200) {
          // User creation successful
          gotoPage("login");
        } else {
          setError("Failed to create user");
        }
      } else {
        setError("Please fill in all required fields and make sure passwords match.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating user.");
    }
  };
  

 

  return (
    <section
      className="vh-100"
      style={{ overflow: "auto", backgroundColor: "#F9F9F9" }}
    >
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-6 col-lg-7 col-xl-6">
            <Carousel >
              <Carousel.Item>
                <img src={logo} alt="My Image" className="my-logo" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={flowers} alt="My Image" className="my-logo" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bowl} alt="My Image" className="my-logo" />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6 col-lg-5 col-xl-6">
            <div class="col-md-2  ">
              <div className="bg-leaf">{/* <img src={leaf} alt="My Image" className="d-none d-lg-block my-leaf-sign  " /> */}</div>
            </div>
            <div className="bg-logo head">
              <img src={sannathan} alt="My Image" className="my-image-register" />
            </div>

            <form className="form" onSubmit={handleValidation}>
              <h3 className="fw-normal-signup">Sign Up</h3>
              <p className="text-muted signup">Enter the details to create your account</p>
              <div className="phone-select">
                <Select
                  label={"User"}
                  inputArry={[
                    { label: "Junior Doctor", value: "Junior Doctor" },
                    { label: "Staff", value: "Staff" },
                  ]}
                  onChange={handleSelectUser}
                />
                {/* {showValidation ? <small id="inputHelp" className="form-text text-muted">{validationMsg}</small>:""} */}
              </div>
              <div className="d-flex phone">
                <div className="userName">
                  <InputControl
                    name={"username"}
                    type={"text"}
                    placeholder={"First Name"}
                    className="		fas fa-user-alt"
                    onChange={handleUserNameInput}
                    required={true}
                    validationMsg="Please enter User Name"
                  />
                </div>
                <div className="userName">
                  <InputControl
                    name={"Lastname"}
                    type={"text"}
                    placeholder={"Last Name"}
                    className="		fas fa-user-alt"
                    onChange={handleUserNameInput}
                    required={true}
                    validationMsg="Please enter Last Name"
                  />
                </div>
                {/* {showValidation ? <small id="inputHelp" className="form-text text-muted">{validationMsg}</small>:""} */}
              </div>
              <div className="phone">
                <InputControl
                  type={"email"}
                  name={"email"}
                  placeholder={"Enter your email"}
                  className="		fa fa-envelope"
                  onChange={handleEmail}
                  required={true}
                  validationMsg="Please enter User E-mail"
                />
              </div>
              <div className="phone">
                <InputControl
                  type={showPassword ? "text" : "password"}
                  backgroundColor="#f9f9f9"
                  placeholder={"Create Password"}
                  className={`fas fa-key ${newPassword !== confirmPassword ? "error" : ""}`}
                  onChange={handleNewPasswordChange}
                />
                <div className="password-toggle-sign" onClick={togglePasswordVisibility}>
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </div>
              </div>
              <div className="phone">
                <InputControl
                  type={showPassword ? "text" : "password"}
                  backgroundColor="#f9f9f9"
                  placeholder={"Confirm Password"}
                  className={`fas fa-key ${newPassword !== confirmPassword ? "error" : ""}`}
                  onChange={handleConfirmPasswordChange}
                />
                <div className="password-toggle-sign" onClick={togglePasswordVisibility}>
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </div>
              </div>
              <div className=" phone">
                <InputControl
                  country={"in"}
                  onChange={handleMobileInput}
                  className="mobile-no"
                  placeholder={"Contact no"}
                  validationMsg="Please enter Mob no"
                />
              </div>
              <div className="text-muted remember-signup">
                <label>
                  <input type="checkbox" />
                  By sign up I agree with{" "}
                  <span className="terms-link" onClick={() => { gotoPage("pdf-sample"); }}>
                    Terms and conditions
                  </span>
                </label>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary rounded w-100 theme-btn mx-auto" type="submit">
                  SIGN IN
                </button>
              </div>

              <p className="small mb-5 pb-lg-">
                <div className="foot-text signup">
                  <p className="text-muted sign">You have an account already?</p>{" "}
                  <p className="text-log" onClick={() => { gotoPage("login"); }}>
                    Log In
                  </p>
                </div>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
