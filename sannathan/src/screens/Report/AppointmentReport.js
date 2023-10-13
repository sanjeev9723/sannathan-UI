import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../../components/HeaderMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BasicAccordion from "../../components/Accordion";
import { Col, Row } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import useAxiosPost from "../../api/useAxiosPost";
import { ToastContainer, toast } from "react-toastify";

const AppointmentReport = ({userRole}) => {
  const gridRef = useRef(); // Optional - for accessing Grid's API

  const axiosInst = useAxiosPost();
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date()); // Initialize toDate as a Date object
  const [filterOption, setFilterOption] = useState(null); // Initialize filterOption as null
  const [selectedFilter, setSelectedFilter] = useState("presentDate"); // Initialize selectedFilter as "presentDate"

  const [rowData, setRowData] = useState();

  // const columnDefs = [
  //   {
  //     headerName: "Appointment Date",
  //     field: "appointmentDate",
  //     cellRenderer: (params) => {
  //       const date = new Date(params.value);
  //       return date.toLocaleDateString();
  //     },
  //   },
  //   // { headerName: "Email", field: "email" },
  //   // { headerName: "ID", field: "id" },
  //   { headerName: "Message", field: "message" },
  //   {
  //     headerName: "Name",
  //     field: "name",
  //     cellStyle: {
  //       whiteSpace: "nowrap",
  //       overflow: "visible",
  //       width: 100,
  //     },
  //     minWidth: 0,
  //   },
  //   { headerName: "Phone Number", field: "phoneNumber" },
  //   {
  //     headerName: "City",
  //     field: "city",
  //     cellStyle: {
  //       whiteSpace: "nowrap",
  //       overflow: "visible",
  //       width: "auto",
  //     },
  //     minWidth: 150,
  //   },

  //   // { headerName: "Slot", field: "slot" },
  //   // { headerName: "Status", field: "status" },
  //   // { headerName: "Total Patients", field: "totalPatients" },
  // ];

  const componentRef = useRef(null);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  });

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "print doc",
  });

  const handleFromDateChange = (event) => {
    const newDateValue = event.target.value; // Get the new date value from the event
    const newDate = new Date(newDateValue); // Convert the value to a Date object
    setFromDate(newDate); // Update the toDate state with the new Date object
  };
  const handleToDateChange = (event) => {
    const newDateValue = event.target.value; // Get the new date value from the event
    const newDate = new Date(newDateValue); // Convert the value to a Date object
    setToDate(newDate); // Update the toDate state with the new Date object
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    const today = new Date();
    let newFromDate = new Date();
    let newToDate = new Date();

    if (filter === "presentDate") {
      // Handle present date filter
      newFromDate = today;
      newToDate = today;
    } else if (filter === "oneWeek") {
      // Handle one week filter
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      newFromDate = oneWeekAgo;
      newToDate = today;
    } else if (filter === "oneMonth") {
      // Handle one month filter
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);
      newFromDate = oneMonthAgo;
      newToDate = today;
    }

    setFromDate(newFromDate);
    setToDate(newToDate);
    setFilterOption(filter);
    fetchReportData();
  };

  // const handlePresentDayFilter = () => {
  //   const today = new Date();
  //   setFromDate(today);
  //   setToDate(today);
  //   setFilterOption("PresentDay");

  //   fetchReportData();

  // };

  // const handleOneWeekFilter = (e) => {
  //   e.preventDefault();
  //   const today = new Date();
  //   const oneWeekAgo = new Date(today);
  //   oneWeekAgo.setDate(today.getDate() - 7);
  //   setFromDate(oneWeekAgo);
  //   setToDate(today);
  //   setFilterOption("OneWeek");

  //   fetchReportData();
  // };

  // const handleOneMonthFilter = (e) => {
  //   e.preventDefault();

  //   const today = new Date();
  //   const oneMonthAgo = new Date(today);
  //   oneMonthAgo.setMonth(today.getMonth() - 1);
  //   setFromDate(oneMonthAgo);
  //   setToDate(today);
  //   setFilterOption("OneMonth");
  //   fetchReportData();
  // };

  const fetchReportData = async () => {
    try {
      let formattedFromDate = fromDate.toISOString().split("T")[0];
      let formattedToDate = toDate.toISOString().split("T")[0];

      //  handle filter options
      if (filterOption === "OneWeek") {
        const oneWeekAgo = new Date(fromDate);
        oneWeekAgo.setDate(fromDate.getDate() - 7);
        formattedFromDate = oneWeekAgo.toISOString().split("T")[0];
      } else if (filterOption === "OneMonth") {
        const oneMonthAgo = new Date(fromDate);
        oneMonthAgo.setMonth(fromDate.getMonth() - 1);
        formattedFromDate = oneMonthAgo.toISOString().split("T")[0];
      } else if (filterOption === "PresentDay") {
        formattedFromDate = formattedToDate; // Use the same date for from and to for the present day filter
      }

      const url = `/appointment/getAppointments?fromDate=${formattedFromDate}&toDate=${formattedToDate}`;
      const response = await axiosInst.get(url);
      const reportData = response.data.data;
      setRowData(reportData);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  // Use the AgGridReact's onGridReady callback to fit the grid width
  const onGridReady = (params) => {
    const gridColumnApi = params.columnApi;
    gridColumnApi.autoSizeAllColumns();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReportData(); // Call the fetchReportData function
  };
  useEffect(() => {
    fetchReportData(); // Fetch initial report data
  }, []);

  const handleClear = () => {
    setFromDate(new Date());
    setToDate(new Date()); // Reset rowData to original data
    setRowData();
  };

  const handleMessageClick = async (message) => {
    if (!message) {
      toast.error("Please enter a patient ID");
      return;
    }

    try {
      const { data } = await axiosInst.get(`/admin/getPatientDetails`, {
        params: {
          patientId: message,
        },
      });

      // navigate(`/adminpage`, {
      //   state: {
      //     patientData: data.data,
      //   },
      // });
      if (userRole === 'admin') {
        // If the user is an admin, navigate to admin page
        navigate(`/adminpage`, {
          state: {
            patientData: data.data,
          },
        });
      } else {
        // If the user is not an admin, you can show a message or handle it as needed
        toast.info("You do not have permission to update.");
      }
    } catch (error) {
      toast.error("Error fetching complete patient details.");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <HeaderMenu />
      <div className="dash-content ">
        <div className="container-fluid">
             {/* toaster notification */}
             <div>
            <ToastContainer position="top-center" />
          </div>
          <div className="patient-details">
            <BasicAccordion
              items={[
                {
                  title: "Appointment Report",
                  content: (
                    <form>
                      <div className="row">
                        <form className="row">
                          <label
                            for="date"
                            className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-12 col-form-label"
                          >
                            From Date :
                          </label>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="input-group date" id="datepicker">
                              <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={fromDate.toISOString().split("T")[0]}
                                onChange={handleFromDateChange}
                              />
                              {/* <span className="input-group-append">
                              <span className="input-group-text bg-light d-block">
                                <i className="fa fa-calendar"></i>
                              </span>
                            </span> */}
                            </div>
                          </div>

                          <label
                            for="date"
                            className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-12 offset-xl-2  offset-lg-2 offset-md-2 offset-sm-2 col-form-label"
                          >
                            End Date :
                          </label>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="input-group date" id="datepicker">
                              <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={toDate.toISOString().split("T")[0]}
                                onChange={handleToDateChange}
                              />
                              {/* <span className="input-group-append">
                              <span className="input-group-text bg-light d-block">
                                <i className="fa fa-calendar"></i>
                              </span>
                            </span> */}
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className="row mt-4">
                        <div className="form-group col-md-2 offset-md-8 mb-2">
                          <button
                            type="button"
                            className="float-right search_width btn btn_clear"
                            onClick={handleSearch}
                          >
                            Search
                          </button>
                        </div>
                        <div className="form-group col-md-2 mb-2">
                          <button
                            type="button"
                            className="float-right search_width btn btn_save"
                            onClick={handleClear}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                      <form className="row">
                        {/* Date filter buttons */}
                        <div className="col-12">
                          <label className=" me-4">Date Filter: </label>
                          <button
                            className={`btn btn-filter ${
                              selectedFilter === "presentDate" ? "active" : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault(); // Prevent form submission
                              handleFilterChange("presentDate");
                            }}
                          >
                            Present Date
                          </button>
                          <button
                            className={`btn btn-filter ${
                              selectedFilter === "oneWeek" ? "active" : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault(); // Prevent form submission
                              handleFilterChange("oneWeek");
                            }}
                          >
                            One Week
                          </button>
                          <button
                            className={`btn btn-filter ${
                              selectedFilter === "oneMonth" ? "active" : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault(); // Prevent form submission
                              handleFilterChange("oneMonth");
                            }}
                          >
                            One Month
                          </button>
                        </div>

                        {/* ... (other form inputs) */}
                      </form>
                    </form>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
      <br />

      {/* AgGridReact component */}
      <div className="d-flex justify-content-center">
        <div className="container">
          <div class="row  table-responsive">
            <h3 className="hidden-element">Sanathan Jeevan Trust</h3>

            {/* Conditional rendering of the table based on rowData */}
            {rowData ? (
              <table
                className="table table-hover table-striped table-bordered print-table"
                ref={componentRef}
              >
                <style>
                  {`
                @media print {
                  body {
                    margin: 1cm 1cm ;
                    padding: 0;
                  }
                
                }
                `}
                </style>
                <thead class="table-dark">
                  <tr>
                    <th>Appointment Date</th>
                    <th>Message</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>City</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {rowData.map((row, index) => (
                    <tr key={index}>
                      <td>
                        {new Date(row.appointmentDate).toLocaleDateString()}
                      </td>
                      <td onClick={() => handleMessageClick(row.message)}>
                        {row.message}
                      </td>{" "}
                      {/* Add onClick handler */}
                      <td>{row.name}</td>
                      <td>{row.phoneNumber}</td>
                      <td>{row.city}</td>
                      <td>
                        <button
                          type="button"
                          className="floar-end btn btn_save"
                          onClick={() => handleMessageClick(row.message)} // Pass patientId or any unique identifier
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-primary rounded save-button px-5"
          onClick={handlePrint}
        >
          print
        </button>
      </div>
    </div>
  );
};

export default AppointmentReport;
