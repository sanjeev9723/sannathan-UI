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

  const CustomDatePickerInput = ({ value, onClick }) => (
    <div className="input-with-icon">
      <input
        type="text"
        value={value}
        onClick={onClick}
        placeholder="Select Date"
      />
      <FontAwesomeIcon icon={faCalendar} className="input-icon" />
    </div>
  );
  const [rowData, setRowData] = useState();

  const columnDefs = [
    {
      headerName: "Appointment Date",
      field: "appointmentDate",
      cellRenderer: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    // { headerName: "Email", field: "email" },
    // { headerName: "ID", field: "id" },
    { headerName: "Message", field: "message" },
    {
      headerName: "Name",
      field: "name",
      cellStyle: {
        whiteSpace: "nowrap",
        overflow: "visible",
        width: "auto",
      },
      minWidth: 200,
    },
    { headerName: "Phone Number", field: "phoneNumber" },
    {
      headerName: "City",
      field: "city",
      cellStyle: {
        whiteSpace: "nowrap",
        overflow: "visible",
        width: "auto",
      },
      minWidth: 150,
    },

    // { headerName: "Slot", field: "slot" },
    // { headerName: "Status", field: "status" },
    // { headerName: "Total Patients", field: "totalPatients" },
  ];

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
      const url = `https://myserver.loca.lt/appointment/getAppointments?fromDate=${formattedFromDate}&toDate=${formattedToDate}`;
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
      <br />
      <div className="container">
        <div className="admin-content">
          <div className="patient-details">
            <BasicAccordion
              items={[
                {
                  title: "Patients Report",
                  content: (
                    <form
                      className="form-horizontal-details"
                      method="post"
                      action="#"
                    >
                      <Row>
                        <Col md={4} className="form-group">
                          <label htmlFor="fromDate">From Date:</label>
                          <DatePicker
                            selected={fromDate}
                            onChange={handleFromDateChange}
                            dateFormat="yyyy-MM-dd"
                            id="fromDate"
                            name="fromDate"
                            customInput={<CustomDatePickerInput />}
                          />
                        </Col>

                        <Col md={4} className="form-group">
                          <label htmlFor="toDate">To Date:</label>
                          <DatePicker
                            selected={toDate}
                            onChange={handleToDateChange}
                            dateFormat="yyyy-MM-dd"
                            id="toDate"
                            name="toDate"
                            maxDate={new Date()}
                            customInput={<CustomDatePickerInput />}
                          />
                        </Col>
                        <Col className="d-flex justify-content-end">
                          <button
                            type="submit"
                            className="btn btn-secondary rounded save-button px-5"
                            onClick={handleSearch}
                          >
                            Search
                          </button>
                          {/* </Col >
                          <Col md={2} > */}
                          <button
                            type="button"
                            className="btn btn-secondary rounded clear px-5 ml-2"
                            onClick={handleClear}
                          >
                            Clear
                          </button>
                        </Col>
                      </Row>
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
        <div
          className="ag-theme-alpine"
          style={{ height: 400, width: 810 }}
          ref={componentRef}
        >
          <h5 className="hidden-element">Sanathan Jeevan Trust</h5>

          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
            columnDefs={columnDefs}
            rowData={rowData}
            onGridReady={onGridReady}
          />
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
