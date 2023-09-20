import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  // Get the current pathname from the location
  const currentPath = location.pathname.replace("/", "");

  return (
    // <Navbar className="custom-navbar" expand="lg">
    //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   <Navbar.Collapse id="responsive-navbar-nav">
    //     <Nav className="mr-auto mx-auto">
    //       <Nav.Link href="#content1" className={currentPath === "adminpage" ? 'active' : ''} onClick={() => gotoPage("adminpage")}>Op Details</Nav.Link>
    //       <Nav.Link href="#content2" className={currentPath === "medicalcategory" ? 'active' : ''} onClick={() => gotoPage("medicalcategory")}>Medical Category</Nav.Link>
    //       <Nav.Link href="#content3" className={currentPath === "diagnosis" ? 'active' : ''} onClick={() => gotoPage("diagnosis")}>Diagnosis</Nav.Link>
    //       <Nav.Link href="#content4" className={currentPath === "prescription" ? 'active' : ''} onClick={() => gotoPage("prescription")}>Prescription</Nav.Link>
    //       <Nav.Link href="#content5" className={currentPath === "suggestion" ? 'active' : ''} onClick={() => gotoPage("suggestion")}>Suggestion</Nav.Link>
    //       <Nav.Link href="#content6" className={currentPath === "preference" ? 'active' : ''} onClick={() => gotoPage("preference")}>Preference</Nav.Link>
    //       {/* <Nav.Link href="#content2"className={currentPath === "preference" ? 'active' : ''} onClick={() => gotoPage("medicalcategory")}>Original Medical Category</Nav.Link>
    //       <Nav.Link href="#content6" className={currentPath === "preference" ? 'active' : ''} onClick={() => gotoPage("preference")}>Disease Status</Nav.Link>
    //       <Nav.Link href="#content6"  className={currentPath === "preference" ? 'active' : ''}onClick={() => gotoPage("preference")}>Free Medicine</Nav.Link>
    //       <Nav.Link href="#content6" className={currentPath === "preference" ? 'active' : ''} onClick={() => gotoPage("preference")}>Disease Status</Nav.Link> */}
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
    <div>
      <ul className="nav nav-tabs  fw-bold" role="tablist">
        <li className="nav-item">
          <Nav.Link
            className={`nav-link ${
              currentPath === "adminpage" ? "active" : ""
            }`}
            onClick={() => gotoPage("adminpage")}
          >
            OP Details
          </Nav.Link>{" "}
        </li>
        <li className="nav-item">
          <Nav.Link
            className={`nav-link ${
              currentPath === "medicalcategory" ? "active" : ""
            }`}
            onClick={() => gotoPage("medicalcategory")}
          >
            Medical Category
          </Nav.Link>{" "}
        </li>
        <li className="nav-item">
          <Nav.Link
            className={`nav-link ${
              currentPath === "diagnosis" ? "active" : ""
            }`}
            onClick={() => gotoPage("diagnosis")}
          >
            Diagnosis
          </Nav.Link>
        </li>
        <li className="nav-item">
          <Nav.Link
            className={`nav-link ${
              currentPath === "prescription" ? "active" : ""
            }`}
            onClick={() => gotoPage("prescription")}
          >
            Prescription
          </Nav.Link>
        </li>
        <li className="nav-item">
          <Nav.Link
            className={`nav-link ${
              currentPath === "suggestion" ? "active" : ""
            }`}
            onClick={() => gotoPage("suggestion")}
          >
            Suggestion
          </Nav.Link>
        </li>
        <li className="nav-item">
          <Nav.Link
            className={`nav-link ${
              currentPath === "preference" ? "active" : ""
            }`}
            onClick={() => gotoPage("preference")}
          >
            Preference
          </Nav.Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
