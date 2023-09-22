import InputControl from "../../components/InputControl";
import styles from "./SignUp.css";
import Select from "../../components/Select.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";
import logo1 from "../images/logo-1.png";
import logo2 from "../images/logo-2.png";
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
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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
    setPasswordsMatch(newPassword === value);
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
          name: userName,
          email: email,
          password: newPassword,
          isDoctor: selectUser === "Junior Doctor" ? "1" : "0",
          isActive: "1",
          contactnumber:mobile ,
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
        setError(
          "Please fill in all required fields and make sure passwords match."
        );
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating user.");
    }
  };

  return (
    <section className="login">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="imgbox text-center">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="center-fit small_images card-img-top"
                    src={logo}
                    alt="Background"
                  />{" "}
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="center-fit small_images card-img-top"
                    src={logo1}
                    alt="Background"
                  />{" "}
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="center-fit small_images card-img-top"
                    src={logo2}
                    alt="Background"
                  />{" "}
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
          {/* <!-- form --> */}
          <div className="col-md-6 callbacks_container form-w3l-agil3">
            <div className="row">
              <div className="col-md-3 offset-md-1">
                <div className="float-start image_signup">
                  <img className="" src={sannathan} alt="Sanaathan Jeevan" />
                </div>
              </div>
              <div className="col-md-8">
                <div className="float-end">
                  <img className="" src={leaf} alt="Logo" />
                </div>
              </div>
            </div>
            <div className="clearfix"> </div>
            <div className="">
              <div className="col-md-8 col-sm-8 offset-md-1 offset-sm-2">
                <form className="" onSubmit={handleValidation}>
                  <div className="mt-1 font-weight-bold">
                    <h2>Sign Up</h2>
                  </div>
                  <p className="mt-3">Enter details to create your account</p>
                  <div className="row ">
                    <div className="">
                      <Select
                        label={"Select User"}
                        inputArry={[
                          { label: "Junior Doctor", value: "Junior Doctor" },
                          { label: "Staff", value: "Staff" },
                        ]}
                        onChange={handleSelectUser}
                      />
                      {/* {showValidation ? <small id="inputHelp" className="form-text text-muted">{validationMsg}</small>:""} */}
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 col-sm-12">
                      <InputControl
                        name={"username"}
                        type={"text"}
                        placeholder={"First Name"}
                        className="		fas fa-user-alt"
                        onChange={handleUserNameInput}
                        required={true}
                        validationMsg="Please enter User Name"
                      />{" "}
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <InputControl
                        name={"Lastname"}
                        type={"text"}
                        placeholder={"Last Name"}
                        className="		fas fa-user-alt"
                        onChange={handleUserNameInput}
                        required={true}
                        validationMsg="Please enter Last Name"
                      />{" "}
                    </div>
                  </div>
                  <div className="">
                    <InputControl
                      type={"email"}
                      name={"email"}
                      placeholder={"Enter your email"}
                      className="		fa fa-envelope"
                      onChange={handleEmail}
                      required={true}
                      validationMsg="Please enter User E-mail"
                    />{" "}
                  </div>
                  <div className="">
                    <InputControl
                      type={showPassword ? "text" : "password"}
                      backgroundColor="#f9f9f9"
                      placeholder={"Create Password"}
                      // className="form-control"
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
                    {/* <div
                      className="password-toggle-sign"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div> */}
                  </div>

                  <div className="">
                    <InputControl
                      type={showPassword ? "text" : "password"}
                      backgroundColor="#f9f9f9"
                      placeholder={"Confirm Password"}
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
                    {!passwordsMatch && (
                      <div className="text-danger">Passwords do not match.</div>
                    )}
                    {/* <div
                      className="password-toggle-sign"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>{" "} */}
                  </div>

                  <div className="row mobile-select mb-4">
                    <div className="col-md-3 col-sm-3 mt-4">
                      {/* <div class="input-group mb-3"> */}
                      <Select
                        label={"+91"}
                        inputArry={[
                          { label: "+00", value: "+00" },
                          { label: "+01", value: "+01" },
                        ]}
                        onChange={handleSelectUser}
                      />
                      {/* <select
                          class="custom-select"
                          id="inputGroupSelect03"
                          aria-label="Example select with button addon"
                        >
                          <option selected value="1">
                            +91
                          </option>
                          <option value="2">+00</option>
                          <option value="3">+01</option>
                        </select> */}
                      {/* </div> */}
                    </div>
                    <div className="col-md-9 col-sm-9">
                      <InputControl
                        country={"in"}
                        onChange={handleMobileInput}
                        className="mobile-no"
                        placeholder={"Contact no"}
                        validationMsg="Please enter Mob no"
                      />
                      {/* <input
                        class="form-control mb-2 mr-sm-2"
                        type="tel"
                        value=""
                        placeholder="Phone number"
                        id="example-tel-input"
                      /> */}
                    </div>
                  </div>
                  <div className="form-check mb-2 mr-sm-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineFormCheck"
                    />
                    <label className="form-check-label" for="inlineFormCheck">
                      By sign up I agree with Termes and condition
                    </label>
                  </div>
                  <p className="text-center">
                    <button
                      className="form-control btn login_button shadow"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </p>

                  <p className="mt-2">
                    <label className="" for="">
                      You have account already?{" "}
                      <span
                        className="sign_text"
                        onClick={() => {
                          gotoPage("login");
                        }}
                      >
                        Sign In
                      </span>
                    </label>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix"> </div>
        {/* <!-- //form --> */}
      </div>
    </section>
  );
};

export default Register;
