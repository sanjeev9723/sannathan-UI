import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import sannathan2 from "../images/sannathan2.png";

function SideNav() {
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemHover = (index) => {
    setActiveItem(index);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </Button>
      {/* <button className="toggle-button" onClick={handleShow}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </button> */}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {" "}
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
                  <a href="/">OP Details</a>
                </li>
                <li
                  className={` nav-item ${activeItem === 1 ? "active" : ""}`}
                  onMouseEnter={() => handleItemHover(1)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                  <a href="/about">Appointments</a>
                </li>
                <li
                  className={`nav-item ${activeItem === 2 ? "active" : ""}`}
                  onMouseEnter={() => handleItemHover(2)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                  <a href="/contact">Reports</a>
                </li>
              </ul>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideNav;
