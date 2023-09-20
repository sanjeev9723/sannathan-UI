import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../../components/HeaderMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BasicAccordion from "../../components/Accordion";
import { Col, Row } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

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
      <div className="dash-content ">
        <div className="container-fluid">
          <div className="patient-details">
            <BasicAccordion
              items={[
                {
                  title: "Appointment Report",
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

      {/* Table */}
      <div className="container">
        <div class="row  table-responsive">
          <table
            className="table table-hover table-striped table-bordered"
            ref={componentRef}
          >

            <thead class="table-dark">
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
