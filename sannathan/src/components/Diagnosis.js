import React, { useState } from "react";
import InputControl from "../../components/InputControl";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import AdminNavbar from "../../components/AdminNavbar";

function Diagnosis() {
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

//   const [email, setEmail] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientID] = useState("");
  const [mobileNo, setMobileNo] = useState("");


  const handlePatientId= (value) => {
    setPatientID(value);
  };
  const handlePatientName= (value) => {
    setPatientName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!patientId) {
        // gotoPage("adminpage");
    }
  };

  return (
    <div>
   <AdminNavbar/>
    <div className="form-gap for-box">
      <div className="container h-100 d-flex justify-content-center align-items-center  ">
        <div className="col-md-4 col-lg-4 forgot-box">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                  <form className="form" onSubmit={handleSubmit}>
                    <h5 className="text-center patient-id">Diagnosis</h5>
                    {/* <p className="text-muted forgot">
                      Enter your registered email address.
                    </p> */}
                    <div className="panel-body">
                      <div className="form-group">
                        <div className="mb-3 input-group">
                          <input
                            type="name"
                            name="name"
                            placeholder="Code ID"
                            className="form-control"
                            value={patientId}
                            onChange={(e) => handlePatientId(e.target.value)}
                            required
                            style={{ backgroundColor: "white" }}
                          />
                        </div>
                        <div className="mb-3 input-group">
                          <input
                            type="name"
                            name="name"
                            placeholder=" Name"
                            className="form-control"
                            value={patientName}
                            onChange={(e) => handlePatientName(e.target.value)}
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
                          save
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
              
              </div>
            </div>
          </div>
          <p className="small mb-5">
            <div className="foot-text">
              <p className="text-backsign" onClick={() => gotoPage("adminpage")}>
                Back to Admin Page
              </p>
            </div>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Diagnosis;
