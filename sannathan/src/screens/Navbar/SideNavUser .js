import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import sannathan2 from "../images/sannathan2.png";
import leafHeader from "../images/leaf-header.png";
import { useNavigate, Link } from "react-router-dom";

function SideNavUser() {
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
  const handleClose = () => setShow(false);
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

          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
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
                  gotoPage("appointments");
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
                  // gotoPage("bookings");
                }}
              >
                <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                Appointment
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
                  <i className="fa fa-clock-o" aria-hidden="true"></i> Report
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
            </nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideNavUser;
