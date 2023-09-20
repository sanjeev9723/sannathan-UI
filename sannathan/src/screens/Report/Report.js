import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import HeaderMenu from "../../components/HeaderMenu";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useReactToPrint } from "react-to-print";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BasicAccordion from "../../components/Accordion";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import useAxiosPost from "../../api/useAxiosPost";

const Report = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API

  const axiosInst = useAxiosPost();
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  const [fromDate, setFromDate] = useState(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return firstDayOfMonth;
  });
  const [toDate, setToDate] = useState(() => {
    const today = new Date();

    return today;
  });

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
  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const fetchReportData = async () => {
    try {
      // Convert fromDate and toDate to ISO string format
      const formattedFromDate = fromDate.toISOString().split("T")[0];
      const formattedToDate = toDate.toISOString().split("T")[0];
      console.log(formattedFromDate, formattedToDate);
      // Construct the URL with the date range parameters
      const url = `/appointment/getAppointments?fromDate=${formattedFromDate}&toDate=${formattedToDate}`;
      console.log(formattedFromDate);
      // Make the Axios GET request to fetch data
      const response = await axiosInst.get(url);

      // Extract the data from the response
      const reportData = response.data.data;

      // Update rowData with the fetched report data
      setRowData(reportData);
      console.log(reportData);
    } catch (error) {
      // Handle errors if the API call fails
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
    setFromDate("");
    setToDate("");
    // Reset rowData to original data
    setRowData();
  };

  return (
    <div>
      <HeaderMenu />
      <div className="dash-content ">
        <div className="container-fluid">
          <div className="patient-details">
            <BasicAccordion
              items={[
                {
                  title: "Patients Report",
                  content: (
                    <form>
                      <div class="row">
                        <form class="row">
                          <label
                            for="date"
                            class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-12 col-form-label"
                          >
                            From Date :
                          </label>
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="input-group date" id="datepicker">
                              <input
                                type="date"
                                class="form-control"
                                id="date"
                                value={fromDate.toISOString().split("T")[0]}
                                onChange={handleFromDateChange}
                              />
                              {/* <span class="input-group-append">
                              <span class="input-group-text bg-light d-block">
                                <i class="fa fa-calendar"></i>
                              </span>
                            </span> */}
                            </div>
                          </div>

                          <label
                            for="date"
                            class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-12 offset-xl-2  offset-lg-2 offset-md-2 offset-sm-2 col-form-label"
                          >
                            End Date :
                          </label>
                          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="input-group date" id="datepicker">
                              <input
                                type="date"
                                class="form-control"
                                id="date"
                                value={toDate.toISOString().split("T")[0]}
                                onChange={handleToDateChange}
                              />
                              {/* <span class="input-group-append">
                              <span class="input-group-text bg-light d-block">
                                <i class="fa fa-calendar"></i>
                              </span>
                            </span> */}
                            </div>
                          </div>
                        </form>
                      </div>

                      <div class="row mt-4">
                        <div class="form-group col-md-2 offset-md-8 mb-2">
                          <button
                            type="button"
                            class="float-right search_width btn btn_clear"
                          >
                            Search
                          </button>
                        </div>
                        <div class="form-group col-md-2 mb-2">
                          <button
                            type="button"
                            class="float-right search_width btn btn_save"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
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
          <div class="row  table-responsive" >
            <h3 className="hidden-element">Sanathan Jeevan Trust</h3>

            {/* Conditional rendering of the table based on rowData */}
            {rowData ? (
              <table className="table table-hover table-striped table-bordered print-table" ref={componentRef}>
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
                  </tr>
                </thead>
                <tbody>
                  {rowData.map((row, index) => (
                    <tr key={index}>
                      <td>
                        {new Date(row.appointmentDate).toLocaleDateString()}
                      </td>
                      <td>{row.message}</td>
                      <td>{row.name}</td>
                      <td>{row.phoneNumber}</td>
                      <td>{row.city}</td>
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

export default Report;
