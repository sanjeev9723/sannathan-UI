import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import sannathan2 from "../images/sannathan2.png";
import leafHeader from "../images/leaf-header.png";
import { useNavigate, Link } from "react-router-dom";

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
        <Button variant="primary">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={sannathan2} alt="My Image" className="my-image-nav" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div className="nav-content ">
              <ul className="nav">
                <li
                  className={`nav-item ${activeItem === 0 ? "active" : ""}`}
                  onMouseEnter={() => handleItemHover(0)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                   <div
                    className={`nav-item-content ${
                      activeItem === 1 ? "active" : ""
                    }`}
                  >
                    <div className="	fas fa-th-large"></div>
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
                    <div className="far fa-calendar"></div>
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
                    <div className="far fa-clock"></div>
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
                      {/* <li>
                        <Link to="/"></Link>
                      </li> */}
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
