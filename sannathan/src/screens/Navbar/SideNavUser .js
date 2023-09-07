import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import sannathan2 from "../images/sannathan2.png";
import leafHeader from "../images/leaf-header.png";
import { useNavigate, Link } from "react-router-dom";

function SideNavUser () {
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
        <img src={sannathan2} alt="My Image" className="sanatha-nav"  />

          <Offcanvas.Title>
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
                    <div className="fa fa-th-list"></div>
                    <Link to="/appointments" onClick={() => gotoPage("appointments")}>
                    OP Details
                  </Link>
                  </div>
                
                </li>
                <li
                  className={` nav-item ${activeItem === 1 ? "active" : ""}`}
                  onMouseEnter={() => handleItemHover(1)}
                  onMouseLeave={() => handleItemHover(null)}
                  onClick={() => gotoPage("bookings")}
                >
                    <div
                    className={`nav-item-content ${
                      activeItem === 1 ? "active" : ""
                    }`}
                  >
                    <div className="fa fa-calendar"></div>
                    <Link to="/bookings">Appointments</Link>
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
                      <li
                      >
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
              </ul>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideNavUser ;
