import { useState,useEffect } from "react";
import BookingList from "./bookingList";
import BookOrder from "./bookOrder";
// import Footer from "../../components/Footer";
import HeaderMenu from "../../components/HeaderMenu";
// import SideNav from "../Navbar";



const Appointments = () => {
  const [selectedPatientData, setSelectedPatientData] = useState([]);

  // Callback function to update selectedPatientData when a patient detail is clicked
  const handlePatientClick = (patientData) => {
    setSelectedPatientData(patientData);
  };
  // console.log(selectedPatientData);

  
    return (
      <>
        <div style={{ overflow: "auto" }}>
          {/* <SideNav /> */}
          <div>
            <HeaderMenu />
  
            <div className="row mb-2 ml-5 mr-5 d-flex justify-content-center  appointment-back">
              <div className="col-md-4 opdetails">
                <div className="row ">
                  <div className="col p-4 d-flex flex-column position-static">
                  <BookingList onPatientClick={handlePatientClick} />                  </div>
                </div>
              </div>
              <div className="col-md-6 patient">
                <div className="row mb-4">
                  <div className="col p-4 d-flex flex-column position-static">
                  <BookOrder selectedPatientData={selectedPatientData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Appointments;
  