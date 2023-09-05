import 'bootstrap/dist/css/bootstrap.min.css';
import InputControl from "../../components/InputControl";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../images/logo.png";
import leaf from "../images/leaf.png";
import flowers from "../images/flowers.png";
import bowl from "../images/bowl.png";
import sannathan from "../images/sannathan.png";
import { client } from "../../api/client";
import { Carousel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducer/authenticationReducer";
import useAxiosPost from "../../api/useAxiosPost";
import axios from "axios";
import styles from "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const axiosInst = useAxiosPost();
  const navigate = useNavigate();
  // const gotoPage = (page) => {
  //   navigate(`/${page}`);
  // };

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    // Check if userRole exists in local storage
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);
  useEffect(() => {
    // Check if rememberMe flag exists in local storage
    const storedRememberMe = localStorage.getItem("rememberMe");
    if (storedRememberMe === "true") {
      setRememberMe(true);
      // If "rememberMe" is true, and there's a stored userRole in local storage, automatically log in the user
      const storedUserRole = localStorage.getItem("userRole");
      if (storedUserRole) {
        setUserRole(storedUserRole);
        dispatch(loginSuccess(storedUserRole));
        gotoPage(storedUserRole === "Admin" ? "adminacess" : "appointments");
      }
    }
  }, []);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleUserNameInput = (value) => {
    setUserName(value);
  };
  const handlePassWordInput = (value) => {
    setPassword(value);
  };
  // const validateLogin = async (userName,password)=>{

  //   const params = `?email=${userName}&passward=${password}`
  //   const result = await client.get(`/admin/login${params}`);
  //   const {data} = result;
  //   if(data?.data?.length > 0){
  //     gotoPage("appointments");
  //   }else{
  //     alert("login failed")
  //   }
  // }
  const handleValidation = (e) => {
    e.preventDefault();
    if (!!userName && !!password) {
      if (userName === "admin@gmail.com" && password === "admin") {
        setUserRole("Admin");
        dispatch(loginSuccess("Admin"));
        // Store the userRole in local storage
        localStorage.setItem("userRole", "Admin");
        gotoPage("adminacess");
      } else {
        setUserRole("user");
        dispatch(loginSuccess("user"));
        // Store the userRole in local storage
        localStorage.setItem("userRole", "user");
        gotoPage("appointments");
      }
    }
    // If "Remember Me" is checked, store the flag in local storage
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      // If "Remember Me" is unchecked, remove the flag from local storage
      localStorage.removeItem("rememberMe");
    }
  };

  // const handleValidation = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const queryParam = `${userName ? "email=" + userName : ""}${
  //       password ? "&passward=" + password : ""
  //     }`;
  //     const { data } = await axiosInst.get(`/admin/login?${queryParam}`);

  //     if (data?.data?.length > 0) {
  //       const isDoctorFromServer = data.data[0].isDoctor; // Assuming the server provides the "isDoctor" field

  //       // Handle doctor login
  //       if (isDoctorFromServer === "true") {
  //         setUserRole("Admin");
  //         dispatch(loginSuccess("Admin"));
  //         setIsLoading(false);

  //         gotoPage("adminacess");
  //       } else {
  //         // Handle other user types (e.g., admin, staff, regular user)
  //         setUserRole("user");
  //         dispatch(loginSuccess("user"));
  //         setIsLoading(false);

  //         gotoPage("appointments");
  //       }
  //     } else {
  //       alert("Login failed");
  //       setIsLoading(false);

  //     }
  //   } catch (error) {
  //     // console.error(error);
  //     setIsLoading(false);
  //     alert(error);
  //   }
  // };

  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <section className="login">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="imgbox text-center">
              <img
                className="center-fit small_images card-img-top"
                src={logo}
                alt="Background"
              />
            </div>
          </div>
          {/* <!-- form --> */}
          <div className="col-md-6 callbacks_container form-w3l-agil3">
            <div className="">
              <div className="float-end">
                <img className="" src={leaf} alt="Logo" />
              </div>
            </div>
            <div className="clearfix"> </div>
            <div className="">
              <div className="col-md-7 col-sm-7 offset-md-1 offset-sm-1">
                <form className="form-group" onSubmit={handleValidation}>
                  {isLoading && (
                    <div class="d-flex justify-content-end">
                      <div class="spinner-border text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}{" "}
                  <div className="float-start image_sana">
                    <img className="" src={sannathan} alt="Sanaathan Jeevan" />
                  </div>
                  <div className="clearfix"> </div>
                  <div className="mt-5 font-weight-bold">
                    <h2>Welcome Back!</h2>
                  </div>
                  <div className="">
                    {/* <input
                      type="email"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="Enter your email"
                      onChange={handleUserNameInput}

                    /> */}

                    <InputControl
                      name={"user name"}
                      type={"text"}
                      placeholder={"User Name"}
                      className="		fas fa-user-alt"
                      id="exampleInputUsename1"
                      onChange={handleUserNameInput}
                      required={true}
                      validationMsg="Please enter User Name"
                    />
                  </div>
                  <div className="mb-4">
                    {/* <input
                      type="password"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="Enter your password"
                      onChange={handlePassWordInput}

                    />
                    <a class="att_icon" href="">
                      <i class="fa fa-eye"></i>
                    </a> */}

                    <InputControl
                      type={"password"}
                      name={"password"}
                      placeholder={"Password"}
                      className="	fas fa-key"
                      id="exampleInputPassword1"
                      onChange={handlePassWordInput}
                      required={true}
                      validationMsg="Please enter User Password"
                      autoComplete="new-password"
                    />
                  </div>
                  <p className="text-center">
                    <button
                      className="form-control btn login_button shadow"
                      type="submit"
                    >
                      Login
                    </button>
                  </p>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 offset-md-0 offset-sm-0">
                      <div className="  form-check mb-2 mr-sm-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineFormCheck"
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                        />
                        <label
                          className="form-check-label"
                          for="inlineFormCheck"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 offset-md-0 offset-sm-0">
                      <label
                        className="form-check-label float-end forgot_text"
                        for="inlineCheckbox1"
                      >
                        <a
                          onClick={() => {
                            gotoPage("forgotpassword");
                          }}
                        >
                          Forgot Password?
                        </a>
                      </label>
                    </div>
                  </div>
                  <p className="mt-2">
                    <label className="" for="">
                      Don't have an account?{" "}
                      <span
                        className="sign_text"
                        onClick={() => {
                          gotoPage("register");
                        }}
                      >
                        Sign Up
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
export default Login;

