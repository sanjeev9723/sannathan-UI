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
import { ToastContainer, toast } from "react-toastify";

const Report = ({userRole}) => {
  const gridRef = useRef(); // Optional - for accessing Grid's API

  const axiosInst = useAxiosPost();
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  const [searchInput, setSearchInput] = useState("");
  const [multiplePatients, setMultiplePatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
// State variables for search criteria
const [searchId, setSearchId] = useState(""); // Patient ID
const [searchName, setSearchName] = useState(""); // Patient Name
const [searchContact, setSearchContact] = useState(""); // Contact Number
  const componentRef = useRef(null);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  });

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "print doc",
  });

  const onSearch = async () => {
    setIsLoading(true);
    try {
      let params = {};

      // Check which search criteria is provided and set the appropriate parameter
      if (searchId) {
        params = { pID: searchId };
      } else if (searchName) {
        params = { pName: searchName };
      } else if (searchContact) {
        params = { pContact: searchContact };
      }

      const { data } = await axiosInst.get(`/appointment/getPatientId`, {
        params,
      });

      setIsLoading(false);


      if (data.data.length > 1) {
        // If there are multiple patients, filter out duplicates based on patientId
        const uniquePatients = data.data.filter((patient, index, self) => {
          return (
            self.findIndex((p) => p.patientId === patient.patientId) === index
          );
        });

        console.log(uniquePatients);
        setMultiplePatients(uniquePatients);
      } else if (data.data.length === 1) {
        console.log(data.data);
        setMultiplePatients(data.data);
      } else {
        // console.log(data.data);
        // setMultiplePatients(data.data);
        // No patient found
        toast.error("No patient details found.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error fetching data.");
      console.error("Error fetching data:", error);
    }
  };
  // const handlePatientIdClick = async (e, patientId) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axiosInst.get(`/appointment/getPatientId`, {
  //       params: { pID: patientId },
  //     });

  //     if (data.data.length === 1) {
  //       navigate(`/adminacess`, { state: { selectedPatientData: data } });
  //     }
  //   } catch (error) {
  //     toast.error("Error fetching patient data.");
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleClear = () => {
    // Clear the search input and reset the state
    setSearchId("");
    setSearchName("");
    setSearchContact("");
    setSearchInput("");
    setMultiplePatients([]);
  };
  const handleMessageClick = async (patientId) => {
    if (!patientId) {
      toast.error("Please enter a patient ID");
      return;
    }

    try {
      const { data } = await axiosInst.get(`/admin/getPatientDetails`, {
        params: {
          patientId: patientId,
        },
      });

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
                  title: "Patients Report",
                  content: (
                    <div className=" row mb-4">
                    {/* spinner for loading */}
                    {isLoading && (
                      <div className="d-flex justify-content-end">
                        <div
                          className="spinner-border text-info"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}{" "}
                    <div className="row mt-2">
                      <div className=" col-md-2 mb-2 offset-md-1">
                        {/* Input for Patient ID */}
                        <input
                          className="form-control mr-sm-2"
                          type="search"
                          name="searchId"
                          value={searchId}
                          onChange={(e) => setSearchId(e.target.value)}
                          placeholder="Patient ID"
                          aria-label="Search by Patient ID"
                        />
                      </div>
                      <div className=" col-md-2 mb-2">
                        {/* Input for Patient Name */}
                        <input
                          className="form-control mr-sm-2"
                          type="search"
                          name="searchName"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                          placeholder="Patient Name"
                          aria-label="Search by Patient Name"
                        />
                      </div>
                      <div className=" col-md-2 mb-2">
                        {/* Input for Contact Number */}
                        <input
                          className="form-control mr-sm-2"
                          type="search"
                          name="searchContact"
                          value={searchContact}
                          onChange={(e) => setSearchContact(e.target.value)}
                          placeholder="Contact Number"
                          aria-label="Search by Contact Number"
                        />
                      </div>
                      <div className="col-md-2  mb-2 search_database " >
                        <button
                            className="float-right search_width btn btn_clear"
                            type="submit"
                          onClick={onSearch}
                        >
                          Search
                        </button>
                      </div>
                      <div className="col-md-2  mb-2">
                        <button
                            className="float-right search_width btn btn_save"
                            type="button"
                          onClick={handleClear}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
      <br />

      <div className="d-flex justify-content-center">
        <div className="container">
          <div className="row  table-responsive">
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
              <thead className="table-dark">
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Contact Number</th>
                  <th>Location</th>
                  <th>Update</th>

                </tr>
              </thead>
              <tbody>
                {multiplePatients.map((patient) => (
                  <tr key={patient.patientId}>
                    <th
                      // onClick={(e) =>
                      //   handlePatientIdClick(e, patient.patientId)
                      // }
                    >
                      {patient.patientId}
                    </th>
                    <td>{patient.patientName}</td>
                    <td>{patient.contactnumber}</td>
                    <td>{patient.address}</td>
                    <td>
                        <button
                          type="button"
                          className="floar-end btn btn_save"
                          onClick={() => handleMessageClick(patient.patientId)} // Pass patientId or any unique identifier
                        >
                          Update
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
