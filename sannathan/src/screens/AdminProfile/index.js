
import { useState, useEffect } from "react";
import BookingList from "../appointments/bookingList";
import AdminProfile from "./AdminProfile";
// import Footer from "../../components/Footer";
import HeaderMenu from "../../components/HeaderMenu";
// import SideNav from "../Navbar";
import { useLocation } from "react-router-dom";


const AdminAcess = () => {
  const location = useLocation();
  const initialSelectedPatientData = location.state
    ? location.state.selectedPatientData
    : [];

  const [selectedPatientData, setSelectedPatientData] = useState(
    initialSelectedPatientData
  )

  // Callback function to update selectedPatientData when a patient detail is clicked
  const handlePatientClick = (patientData) => {
    setSelectedPatientData(patientData);
  };
  console.log(selectedPatientData);

  return (
    <>
      <div className="dash ">
        {/* <SideNav /> */}
        <div>
          <HeaderMenu />

          <main className="dash-content">
            <div className="container-fluid">
            <h2 className="op-detail2 ">OP Details</h2>
          
              <hr className="mt-0 mb-0" />
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12">
                  <BookingList onPatientClick={handlePatientClick} />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 offset-xl-1 offset-lg-1 offset-md-1 offset-sm-0">
                  <AdminProfile selectedPatientData={selectedPatientData} />
                </div>
              </div>
            </div>
          </main>

          {/* <div className="row mb-2 ml-5 mr-5 d-flex justify-content-center  appointment-back">
              <div className="col-md-4 opdetails">
                <div className="row ">
                  <div className="col p-4 d-flex flex-column position-static">
                  <BookingList onPatientClick={handlePatientClick} />                  
                  </div>
                </div>
              </div>
              <div className="col-md-6 patient">
                <div className="row mb-4">
                  <div className="col p-4 d-flex flex-column position-static">
                    <AdminProfile selectedPatientData={selectedPatientData} />
                  </div>
                </div>
              </div>
           
            </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminAcess;
