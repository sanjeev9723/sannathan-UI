import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import sannathan2 from "../images/sannathan2.png";
import leafHeader from "../images/leaf-header.png";
import { useNavigate, Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

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
        <Button variant="link">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <img src={sannathan2} alt="My Image" className="sanatha-nav" />

          <Offcanvas.Title>
            {/* <img src={sannathan2} alt="My Image" className="img_dashboard" /> */}
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
            <nav className="dash-nav-list">
              <a
                href="opdetails.html"
                className="dash-nav-item nav-link active"
              >
                <i className="fa fa-th-list" aria-hidden="true"></i> OP Details
              </a>
              <a href="appointment.html" className="dash-nav-item nav-link">
                <i className="fa fa-calendar-o" aria-hidden="true"></i>{" "}
                Appointment{" "}
              </a>
              <a href="training.html" className="dash-nav-item nav-link">
                <i className="fa fa-user-o" aria-hidden="true"></i> Training
                Registrations{" "}
              </a>
              <a href="reports.html" className="dash-nav-item nav-link">
                <div class="dropdown open">
                  <button
                    class="btn dropdown-toggle btn_icons"
                    type="button"
                    id="dropdownMenu5"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-clock-o" aria-hidden="true"></i> Reports
                  </button>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#!">
                      Profile
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#!">
                      Setting
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#!">
                      Logout
                    </a>
                  </div>
                </div>
              </a>
            </nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideNavAdmin;
