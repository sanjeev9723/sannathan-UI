import { useState,useEffect } from "react";
import BookingList from "./bookingList";
// import Footer from "../../components/Footer";
import HeaderMenu from "../../components/HeaderMenu";
// import SideNav from "../Navbar";



const Bookings = () => {
 
  
    return (
      <>
        <div className="app overflow-auto">
          {/* <SideNav /> */}
          <div>
            <HeaderMenu />
  
            <div className="row mb-2 ml-5 mr-5 d-flex justify-content-center  appointment-back">
              <div className="col-md-6 opdetails">
                <div className="row ">
                  <div className="col p-4 d-flex flex-column position-static">
                    <BookingList />
                  </div>
                </div>
              </div>
           
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Bookings;
  