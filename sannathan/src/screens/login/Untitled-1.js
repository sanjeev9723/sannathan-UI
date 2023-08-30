import InputControl from "../../components/InputControl";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";
import leaf from "../images/leaf.png";
import sannathan from "../images/sannathan.png"


const Login = () => {
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameInput = (value) => {
    setUserName(value);
  };
  const handlePassWordInput = (value) => {
    setPassword(value);
  };

  const handleValidation = (e) => {
    e.preventDefault();
    if (!!userName && !!password) {
      gotoPage("appointments");
    }
  };

  return (
    <div className="grid-layouts container">
      {/* <img src={logo} /> */}
      {/* <div className="row-log"  style={{ backgroundImage: `url(${logo})`, backgroundSize: "cover"  }}> */}
      <div className="row-log">
        {/* <div className="col-sm-6 bg-sign">SANNATHAN JEEVAN</div> */}
        <div
          className="col-sm-6 col-md-6 bg-logo"
        
        >
 <img src={logo} alt="My Image" className="my-logo" />
        </div>
        <div className="col-sm-6 col-md-6 bg-login">
        <div className="bg-leaf">
            <img src={leaf} alt="My Image" className="my-image" />
          </div>
        <div className="bg-logo">
            <img src={sannathan} alt="My Image" className="my-image-logo" />
          </div>
          {/* <div className=" bg-sign">Sannathan Jeevan</div>
          <div className=" bg2-sign">ancient ways of life</div> */}
          <form  className="form" onSubmit={handleValidation}>
            <h3 className="fw-normal">Welcome back!</h3>

            <div >
              <InputControl
               
                name={"username"}
                type={"text"}
                placeholder={"UserName"}
                className="		fas fa-user-alt"
                id="exampleInputUsename1"
                onChange={handleUserNameInput}
                required={true}
                validationMsg="Please enter User Name"
              />
              {/* {showValidation ? <small id="inputHelp" className="form-text text-muted">{validationMsg}</small>:""} */}
            </div>
            <div className="mb-3">
              <InputControl
                
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                className="	fas fa-key"
                id="exampleInputPassword1"
                onChange={handlePassWordInput}
                required={true}
                validationMsg="Please enter User Password"
              />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-success" type="submit">
                LOG IN
              </button>
            </div>

            <p className="small mb-5 pb-lg-">
              <p
                className="text"
                onClick={() => {
                  gotoPage("ForgotPassword");
                }}
              >
                {" "}
                Forgot password?
              </p>
              <div className="remember">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>
              </div>

              <div className="foot-text">
                <p className="text-muted sign"> Don't have an account?</p>
                <p
                  className="text-sign"
                  onClick={() => {
                    gotoPage("register");
                  }}
                >
                  Sign Up
                </p>
              </div>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
