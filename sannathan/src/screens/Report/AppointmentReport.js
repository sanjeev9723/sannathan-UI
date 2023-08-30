import React, { useState, useRef } from "react";
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

const AppointmentReport = () => {
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
  const [rowData, setRowData] = useState([
    { id: 1, name: "John Doe", age: 30, date: "2023-07-01" },
    { id: 2, name: "Jane Smith", age: 25, date: "2023-04-05" },
    { id: 3, name: "Bob Johnson", age: 40, date: "2023-05-10" },
    { id: 4, name: "Alice Johnson", age: 35, date: "2023-06-15" },
    { id: 5, name: "Michael Brown", age: 45, date: "2023-08-20" },
    { id: 6, name: "Bob Johnson", age: 40, date: "2023-05-10" },
    { id: 7, name: "Alice Johnson", age: 35, date: "2023-06-15" },
    { id: 8, name: "Michael Brown", age: 45, date: "2023-08-20" },
    { id: 9, name: "Michael Brown", age: 45, date: "2023-08-20" },
  ]);

  const columnDefs = [
    { headerName: "Patient ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Age", field: "age" },
    { headerName: "Date", field: "date" },
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

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter the rowData based on fromDate and toDate
    const filteredData = rowData.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        (fromDate === "" || new Date(fromDate) <= itemDate) &&
        (toDate === "" || new Date(toDate) >= itemDate)
      );
    });
    // Update the rowData with the filtered data
    setRowData(filteredData);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    // Reset rowData to original data
    setRowData([
      { id: 1, name: "John Doe", age: 30, date: "2023-07-01" },
      { id: 2, name: "Jane Smith", age: 25, date: "2023-04-05" },
      { id: 3, name: "Bob Johnson", age: 40, date: "2023-05-10" },
      { id: 4, name: "Alice Johnson", age: 35, date: "2023-06-15" },
      { id: 5, name: "Michael Brown", age: 45, date: "2023-08-20" },
      { id: 6, name: "Bob Johnson", age: 40, date: "2023-05-10" },
      { id: 7, name: "Alice Johnson", age: 35, date: "2023-06-15" },
      { id: 8, name: "Michael Brown", age: 45, date: "2023-08-20" },
    ]);
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
                  title: "Appointment Report",
                  content: (
                    <form
                      className="form-horizontal-details"
                      method="post"
                      action="#"
                    >
                      <Row>
                        <Col md={3} className="form-group">
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

                        <Col md={3} className="form-group">
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
  <br></br>

      {/* AgGridReact component */}
      <div className="d-flex justify-content-center">
        <div
          className="ag-theme-alpine"
          style={{ height: 400, width: 810 }}
          ref={componentRef}
        >
            <br></br>
        <h4 className="hidden-element">SANNATHAN JEEVAN TRUST</h4>
          <AgGridReact columnDefs={columnDefs} rowData={rowData} />
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-primary rounded save-button px-5 my-3"
          onClick={handlePrint}
        >
          print
        </button>
      </div>
    </div>
  );
};

export default AppointmentReport;
