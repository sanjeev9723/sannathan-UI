import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import sannathan2 from "../images/sannathan2.png";
import leafHeader from "../images/leaf-header.png";
import { useNavigate, Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';


function SideNavAdmin() {
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemHover = (index) => {
    setActiveItem(index);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="menu-button" onClick={handleShow}>
      <a href="#!" class="menu-toggle">
						<i class="fa fa-bars" aria-hidden="true"></i>
					</a>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={sannathan2} alt="My Image" className="img_dashboard" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {/* <div className="dash-nav dash-nav-dark">
            <header>
                <a href="index.html" className=""><img className="sanatha-nav" src={sannathan2} alt="Sanaathan Jeevan"/></a>
            </header>
			<nav className="dash-nav-list">
                <a href="opdetails.html" className="dash-nav-item nav-link active"> 
                    <i className="fa fa-th-list" aria-hidden="true"></i> OP Details</a>
                <a href="appointment.html" className="dash-nav-item nav-link">
                    <i className="fa fa-calendar-o" aria-hidden="true"></i> Appointment </a>
                <a href="training.html" className="dash-nav-item nav-link">
                    <i className="fa fa-user-o" aria-hidden="true"></i> Training Registrations </a>
                <a href="reports.html" className="dash-nav-item nav-link">
                    <i className="fa fa-clock-o" aria-hidden="true"></i> Reports </a>
            </nav>
			
			
        </div> */}
          <div>
            <div className="nav-content ">
              <ul className="nav">
                <li
                  className={`nav-item" ${activeItem === 0 ? "active" : ""}`}
                  onMouseEnter={() => handleItemHover(0)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                   <div
                    className={`nav-item-content ${
                      activeItem === 1 ? "active" : ""
                    }`}
                  >
                    <div className="fa fa-th-list"></div>
                  <Link to="/adminpage">OP Details</Link>
                  </div>
                </li>
                
                <li
                  className={`nav-item ${activeItem === 1 ? "active" : ""}`}
                  onMouseEnter={() => handleItemHover(1)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                  <div
                    className={`nav-item-content ${
                      activeItem === 1 ? "active" : ""
                    }`}
                  >
                    <div className="fa fa-calendar"></div>
                    <Link to="/adminacess">Appointment</Link>
                  </div>
                </li>

                <li
                  className={`nav-item ${activeItem === 2 ? "active" : ""}`}
                  onMouseEnter={() => handleItemHover(2)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                  <div
                    className={`nav-item-content ${
                      activeItem === 1 ? "active" : ""
                    }`}
                  >
                    <div className="fa fa-clock-o"></div>
                    <Link to="">Report</Link>
                  </div>
                  

                  {activeItem === 2 && (
                    <ul className="sub-nav">
                      <li>
                        <span className="bullet">➤</span>

                        <Link to="/report">Patients Report</Link>
                      </li>
                      <li>
                        <span className="bullet">➤</span>

                        <Link to="/appointmentreport">Appointment Report</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className={`nav-item ${activeItem === 3 ? "active" : ""}`}
                  onMouseEnter={() => handleItemHover(3)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                     <div
                    className={`nav-item-content ${
                      activeItem === 1 ? "active" : ""
                    }`}
                  >
                    <div className="fa fa-user"></div>
                    <Link to="">Administrator</Link>
                  </div>
                 

                  {activeItem === 3 && (
                    <ul className="sub-nav">
                      <li>
                        <span className="bullet">➤</span>

                        <Link to="/medicalcategory">MedicalCategory</Link>
                      </li>
                      <li>
                        <span className="bullet">➤</span>

                        <Link to="/diagnosis">Diagnosis</Link>
                      </li>
                      <li>
                        <span className="bullet">➤</span>

                        <Link to="/prescription">Prescription</Link>
                      </li>
                      <li>
                        <span className="bullet">➤</span>

                        <Link to="/suggestion">Suggestion</Link>
                      </li>
                      <li>
                        <span className="bullet">➤</span>

                        <Link to="/preference">Preference</Link>
                      </li>
                    
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideNavAdmin;
