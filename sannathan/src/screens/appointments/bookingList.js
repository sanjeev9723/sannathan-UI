import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../../components/Search";
import countpng from "../images/count.png";
import checkpng from "../images/checkcount.png";
import UserTable from "./UserTable";
import axios from "axios";
import useAxiosPost from "../../api/useAxiosPost";

const BookingList = ({ onPatientClick }) => {
  const orders = useSelector(({ appointments }) => appointments?.orderList);
  const axiosInst = useAxiosPost();

  const [checkedCount, setCheckedCount] = useState(0);
  const [showAllPatients, setShowAllPatients] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedOrdersCount, setFetchedOrdersCount] = useState(0);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleCheckedCountClick = () => {
    setShowAllPatients(false); // Set filtering to show only visited patients
  };

  const handleTotalCountClick = () => {
    setShowAllPatients(true); // Set filtering to show all patients
  };

    const getNewServerDate = () => {
      const d = new Date();
      return `${d.getFullYear()}-${
        d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)
      }-${d.getDate() > 9 ? d.getDate() : "0" + d.getDate()}`;
    };

  // Function to fetch appointments data
  const fetchAppointments = async () => {
    try {
      setIsLoading(true);

      // Define the start and end date of the range
      const fromDate = getNewServerDate() + " 00:00:00";
      const toDate = getNewServerDate() + " 23:59:59";

      // Construct the URL with the query parameters for the date range
      const url = `/appointment/getAppointments?fromDate=${encodeURIComponent(
        fromDate
      )}&toDate=${encodeURIComponent(toDate)}`;

      // Make the Axios GET request to fetch appointments
      const response = await axiosInst.get(url);

      // Extract the appointments data from the response
      const appointments = response.data;
      // It counts the data
      setFetchedOrdersCount(appointments.data.length); 

      // Handle the fetched appointments data as needed
      console.log("Appointments for the specified date range:", appointments);

      setFetchedOrders(appointments.data);
      setIsLoading(false);

      // Return the appointments data
      // return Array.isArray(appointments) ? appointments : [];
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setIsLoading(false);

      return [];
    }
  };

  // useEffect hook to fetch appointments data when the component mounts
  useEffect(() => {
    const getAppointments = async () => {
      const fetchedAppointments = await fetchAppointments();
    };
    getAppointments();
  }, [orders]);

  return (
    <>
      <div className="row count">
        {/* <h4 className="op-detail">OP Details</h4> */}
        

        <p className="mt-3 mb-4 fw-bold patient_size">Patient Orders</p>

        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
            <div>
              <img className="iconDetails" src={countpng} alt="Logo" />
            </div>
            <div style={{ marginLeft: 60 }}>
              <h2 className="mb-0">{fetchedOrdersCount}</h2>
              <p>Total Count</p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 pl-0">
            <div>
              <img className="iconDetails" src={checkpng} alt="Logo" />
            </div>
            {/* <div style='margin-left:60px;'> */}
            <div style={{ marginLeft: 60 }}>
              <h2 className="mb-0">568</h2>
              <p>Checked Count</p>
            </div>
          </div>
        </div>
        {/* <div className="row col-sm-6" onClick={handleTotalCountClick}>
          <div className="col-7 count" for="fname">
            <img src={countpng} alt="checkcount" className="count-icon" />
          </div>
          <div className="check-main">
            <div className="col-4 reg-count">{orders.length}</div>
            Total Count
          </div>
        </div> */}
        {/* <div className="row col-sm-6" onClick={handleCheckedCountClick}>
          <div className="col-7 count" for="fname">
            <img src={checkpng} alt="checkcount" className="check-icon" />
          </div>
          <div className="check-main">
            <div className="col-4 check-count">{checkedCount}</div>
            Checked Count
          </div>
        </div> */}
      </div>

      <div className="mt-2  mb-3  has-search">
        <SearchBar onSearch={handleSearch} />
      </div>
      {isLoading && (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
      {/* <UserTable orders={orders} checkedCount={checkedCount} setCheckedCount={setCheckedCount} showAllPatients={showAllPatients} searchTerm={searchTerm} /> */}
      <UserTable
        orders={fetchedOrders} // Assuming orders is the Redux state data
        // orders={fetchedOrders} // Assuming orders is the Redux state data
        checkedCount={checkedCount}
        setCheckedCount={setCheckedCount}
        showAllPatients={showAllPatients}
        searchTerm={searchTerm}
        onPatientClick={onPatientClick} // Pass the onPatientClick prop down to UserTable
      />
    </>
  );
};

export default BookingList;
