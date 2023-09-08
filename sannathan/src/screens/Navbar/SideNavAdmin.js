import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import sannathan2 from "../images/sannathan2.png";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

function SideNavAdmin() {
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [subMenuVisible, setSubMenuVisible] = useState(null);

  const handleItemHover = (index) => {
    setActiveItem(index);
  };

  const handleSubMenuHover = (index) => {
    setSubMenuVisible(index);
  };

  const handleClose = () => {
    setShow(false);
    setActiveItem(null);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="menu-button" onClick={handleShow}>
        <Button variant="link">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <img src={sannathan2} alt="My Image" className="sanatha-nav" />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="dash-nav-list">
            <a
              onMouseEnter={() => {
                handleItemHover(0);
                setSubMenuVisible(null);
              }}
              className={`dash-nav-item nav-link ${
                activeItem === 0 ? "active" : ""
              }`}
              onClick={() => {
                gotoPage("adminpage");
              }}
            >
              <i className="fa fa-th-list" aria-hidden="true"></i> OP Details
            </a>
            <a
              onMouseEnter={() => {
                handleItemHover(1);
                setSubMenuVisible(null);
              }}
              className={`dash-nav-item nav-link ${
                activeItem === 1 ? "active" : ""
              }`}
              onClick={() => {
                gotoPage("adminacess");
              }}
            >
              <i className="fa fa-calendar" aria-hidden="true"></i> Appointment
            </a>
            <div
              className={`dropdown ${subMenuVisible === 2 ? "active" : ""}`}
              onMouseEnter={() => handleSubMenuHover(2)}
              onMouseLeave={() => handleSubMenuHover(null)}
            >
              <a
                onMouseEnter={() => handleItemHover(2)}
                className={`dash-nav-item nav-link ${
                  activeItem === 2 || subMenuVisible === 1 ? "active" : ""
                }`}
              >
                <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                Report
              </a>
              {subMenuVisible === 2 && (
                <div className="dropdown-content">
                  <a onClick={() => gotoPage("report")}>Patients Report</a>
                  <a onClick={() => gotoPage("appointmentreport")}>
                    Appointment Report
                  </a>
                </div>
              )}
            </div>
            <div
              className={`dropdown ${subMenuVisible === 3 ? "active" : ""}`}
              onMouseEnter={() => handleSubMenuHover(3)}
              onMouseLeave={() => handleSubMenuHover(null)}
            >
              <a
                onMouseEnter={() => handleItemHover(3)}
                className={`dash-nav-item nav-link ${
                  activeItem === 3 || subMenuVisible === 2 ? "active" : ""
                }`}
              >
                <i className="fa fa-user-o" aria-hidden="true"></i>{" "}
              Administrator
              </a>
              {subMenuVisible === 3 && (
                <div className="dropdown-content">
                       <a onClick={() => { gotoPage("medicalcategory");}}> MedicalCategory</a>
                  <a onClick={() => { gotoPage("diagnosis");}}> Diagnosis</a>
                  <a onClick={() => { gotoPage("prescription");}}> Prescription</a>
                  <a onClick={() => { gotoPage("suggestion");}}> Suggestion</a>
                  <a onClick={() => { gotoPage("preference");}}> Preference</a>
                </div>
              )}
            </div>

           
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideNavAdmin;
