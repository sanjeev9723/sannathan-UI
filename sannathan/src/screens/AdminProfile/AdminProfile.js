import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputControl from "../../components/InputControl";
import Select from "../../components/Select.js";
import { addNewOrder } from "../../redux/reducer/AppointmentReducer";
// import MyVerticallyCenteredModal from "./modal";
import MyVerticallyCenteredModal from "../appointments/modal";
import CenteredModal from "../appointments/AdditionalDetails";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import GenderInput from "../appointments/GenderInput";
import { Col, Row } from "react-bootstrap";
import InputModal from "../appointments/InputModal";
import SearchInput from "../../components/SearchInput";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import BasicAccordion from "../../components/Accordion";
import useAxiosPost from "../../api/useAxiosPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Print from "../appointments/print";
import RePrint from "../appointments/RePrint";
import StyledModal from "../../components/ReusableModal";

const AdminProfile = ({ selectedPatientData }) => {
  const axiosInst = useAxiosPost();
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };
  const printRef = useRef(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [textValue, setTextValue] = useState(""); // Add setTextValue to the useState hook
  const [tokenCounter, setTokenCounter] = useState(100); // Initialize the token counter
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [bookingOrder, setBookingOrder] = useState([]);
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [patientId, setPatientId] = useState("");
  const [resetFields, setResetFields] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientData, setPatientData] = useState([]); // State to store patient details
  const [isLoading, setIsLoading] = useState(false); // State to control the loader
  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(false);
  const [printModalVisible, setPrintModalVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [multiplePatients, setMultiplePatients] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null); //  used for slecting checkbox

  // const [ selectedSingleData, setSelectedSingleData]= useState({})
  const selectedSingleData = {};

  // const [patientId, setPatientID] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const dispatch = useDispatch();
  const bookingFields =
    useSelector((state) => state.appointments.appointmentFields) || [];

  const handlePrintModalOpen = () => {
    setPrintModalVisible(true);
    setIsPrintButtonVisible(false);
  };

  useEffect(() => {
    setBookingOrder(bookingFields);
  }, [bookingFields]);

  // useEffect(() => {
  //   if (selectedPatientData) {
  //     // setPatientName(selectedPatientData.name || "");
  //     // setPatientId(selectedPatientData.message || "");
  //     // setGender(selectedPatientData.gender || "");

  //     // When selectedPatientData is updated, show the print button
  //     setIsPrintButtonVisible(true);
  //   } else {
  //     // Hide the print button when selectedPatientData is not available
  //     setIsPrintButtonVisible(false);
  //   }
  // }, [selectedPatientData]);
  // console.log(selectedPatientData);

  useEffect(() => {
    console.log(selectedPatientData);
    if (
      selectedPatientData &&
      selectedPatientData.data &&
      selectedPatientData.data.length > 0
    ) {
      setSearchInput(selectedPatientData.data[0].patientId || "");

      // Create a mapping object to map field names in bookingFields to selectedPatientData keys
      const fieldToDataMap = {
        date: "appointmentDate",
        address: "address",
        patientName: "name",
        gender: "gender",
        age: "age",
        weight: "weight",
        contactnumber: "contactNumber",
      };
      // set the selePatientData for gender so it will easy for reset
      if (selectedPatientData.data && selectedPatientData.data.length > 0) {
        const genderValue = selectedPatientData.data[0].gender;
        if (genderValue) {
          setGender(genderValue);
        }
      }
      // Check if selectedPatientData is not null or undefined
      if (
        selectedPatientData.data[0] &&
        !Array.isArray(selectedPatientData.data[0]) &&
        bookingFields.length > 0
      ) {
        const updatedBookingFields = bookingFields.map((field) => {
          if (fieldToDataMap.hasOwnProperty(field.field)) {
            const dataField = fieldToDataMap[field.field];
            if (selectedPatientData.data[0].hasOwnProperty(dataField)) {
              return {
                ...field,
                value: selectedPatientData.data[0][dataField],
              };
            }
          }
          return field;
        });

        // console.log("updatedBookingFields:", updatedBookingFields);
        setBookingOrder(updatedBookingFields);

        // When selectedPatientData.data[0] is updated and it has data, show the Print button
        setIsPrintButtonVisible(true);
      } else {
        // Hide the Print button when selectedPatientData is not available or doesn't have data
        setIsPrintButtonVisible(false);
      }
    } else {
      // Handle the case when selectedPatientData or selectedPatientData.data is undefined
      // You may want to set default values or handle this situation as needed.
    }
  }, [selectedPatientData, bookingFields]);

  // it access the array of object
  bookingOrder.forEach((ele) => {
    if (!selectedSingleData[ele.field]) {
      selectedSingleData[ele.field] = ele.value;
    } else {
      selectedSingleData[ele.field].push(ele.value);
    }
  });

  const handleShow = () => setModalShow(true);
  const onClick = () => setAddShow(true);

  const onFieldChange = (value, field) => {
    if (field === "gender") {
      setGender(value);
      setErrors((prevErrors) => {
        return { ...prevErrors, gender: undefined };
      });

      // Update the bookingOrder state for gender field
      const updatedOrder = bookingOrder.map((order) => {
        if (order.field === field) {
          return { ...order, value };
        }
        return order;
      });
      setBookingOrder(updatedOrder);
    } else {
      const updatedOrder = bookingOrder.map((order) => {
        if (order.field === field) {
          return { ...order, value };
        }
        return order;
      });

      setBookingOrder(updatedOrder);

      // Remove the error message for the field
      setErrors((prevErrors) => {
        return { ...prevErrors, [field]: undefined };
      });
    }
  };
  // reset  the fields
  const resetBookingOrder = () => {
    const resetOrder = bookingOrder.map((order) => {
      // Preserve the value of "date" and "location" fields
      if (order.field === "date" || order.field === "location") {
        return order;
      }
      return { ...order, value: "" };
    });
    setBookingOrder(resetOrder);
  };

  // Reset form
  const resetForm = () => {
    setPhoneNumber("");
    setSearchInput("");
    setCountryCode("");
    setGender("");
    setPatientId("");
    resetBookingOrder(); // Reset bookingOrder fields
    setPatientData({}); // Clear the fetched patient data
    setErrors("");
    setIsPrintButtonVisible(false);
    setIsUpdateVisible(false);

    setResetFields(!resetFields);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    // Validate gender
    if (!gender) {
      errors.gender = "Please select a gender";
    }
    bookingOrder.forEach((field) => {
      if (field.required && !field.value) {
        errors[field.field] = `${field.displayName} is required`;
      }
    });
    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const onSearch = async () => {
    setSelectedCheckbox(null); // to prevent of getting previous values and chekbox
    setIsLoading(true);
    try {
      let params = {};

      // Check if the search input is not empty
      if (searchInput) {
        // Determine which parameter to set based on the input
        if (/^\d{1,9}$/.test(searchInput)) {
          // If the input is a number with 1 to 9 digits, set pID (patientId)
          params = { pID: searchInput };
        } else if (/^\+?\d+$/.test(searchInput)) {
          // If the input is a phone number, set pContact (phoneNumber)
          params = { pContact: searchInput };
        } else {
          // Otherwise, assume it's a name and set pName (patientName)
          params = { pName: searchInput };
        }
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

        if (params.pID) {
          // If the search was performed with a patient ID, and there are multiple records,
          // display the first record directly in the fields
          setPatientData(uniquePatients[0]);
          setGender(uniquePatients[0].gender || "");
          setSearchInput(uniquePatients[0].patientId);

          // Update the bookingOrder state with fetched data
          const updatedOrder = bookingOrder.map((order) => {
            if (uniquePatients[0].hasOwnProperty(order.field)) {
              return { ...order, value: uniquePatients[0][order.field] };
            }
            return order;
          });
          setBookingOrder(updatedOrder);

          // If patient data is found, set the selectedPatient state with the fetched data
          // and show the "Update" button
          setSelectedPatient(uniquePatients[0]);
          setIsUpdateVisible(true);
        } else {
          // If the search was performed with a different parameter, show the modal with multiple records
          setMultiplePatients(uniquePatients);
          setSearchModalVisible(true);
        }
      } else if (data.data.length === 1) {
        // If only one patient is found, set the patient data and update the state
        setPatientData(data.data[0]);
        setGender(data.data[0].gender || "");
        setSearchInput(data.data[0].patientId);
        console.log(data.data);
        // Update the bookingOrder state with fetched data
        const updatedOrder = bookingOrder.map((order) => {
          if (data.data[0].hasOwnProperty(order.field)) {
            return { ...order, value: data.data[0][order.field] };
          }
          return order;
        });
        setBookingOrder(updatedOrder);

        // If patient data is found, set the selectedPatient state with the fetched data
        // and show the "Update" button
        setSelectedPatient(data.data[0]);
        setIsUpdateVisible(true);
        // ...rest of your code
      } else {
        // No patient found
        toast.error("No patient details found.");
      }
    } catch (error) {
      setIsLoading(false);
      // setMultiplePatientsFound(false); // Reset the state in case of an error
      toast.error("Error fetching data.");
      console.error("Error fetching data:", error);
    }
  };

  //  search onclicking the pID in modal
  const handleSearch = async (patientId) => {
    setIsLoading(true);
    setSearchModalVisible(false);

    try {
      const { data } = await axiosInst.get(`/appointment/getPatientId`, {
        params: {
          pID: patientId,
        },
      });

      setIsLoading(false);
      setPatientData(data.data[0]);
      setGender(data.data[0].gender || "");
      setSearchInput(data.data[0].patientId);
      console.log(data.data);
      // Update the bookingOrder state with fetched data
      const updatedOrder = bookingOrder.map((order) => {
        if (data.data[0].hasOwnProperty(order.field)) {
          return { ...order, value: data.data[0][order.field] };
        }
        return order;
      });
      setBookingOrder(updatedOrder);

      // If patient data is found, set the selectedPatient state with the fetched data
      // and show the "Update" button
      setSelectedPatient(data.data[0]);
      setIsUpdateVisible(true);
    } catch (error) {
      setIsLoading(false);
      setIsUpdateVisible(false);
      toast.error("No patient details found.");
      console.error("Error fetching data:", error);
    }
  };

  const onUpdate = async () => {
    const { patientId } = selectedPatient; // need to extracrt coz patientID is not applying due to search

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

      navigate(`/adminpage`, {
        state: {
          patientData: data.data,
        },
      });
    } catch (error) {
      toast.error("Error fetching complete patient details.");
      console.error("Error fetching data:", error);
    }
  };

  //  console.log(patientData);
  const onSave = (e) => {
    e.preventDefault();
    // Validate the form
    const isValid = validateForm();
    if (isValid) {
      // Form is valid, proceed with saving the order
      // const PatientId = Math.round(Math.random() * 100);
      const TokenNumber = tokenCounter; // Use the token counter value
      let order = {
        TokenNumber: TokenNumber,
        // PatientId: PatientId,
        checked: false,
      };
      let data = { TokenNumber: TokenNumber };
      // order.gender = gender || patientData.gender || "";
      // order.phoneNumber = phoneNumber || patientData.phoneNumber || "";
      bookingOrder.forEach(({ field, displayName, value }) => {
        order[field] = value;
        data[displayName] = value;
      });
      console.log(order);
      (async () => {
        try {
          // Create the appointment object with the required data
          const appointmentData = {
            address: patientData?.address || "",
            city: patientData?.address || "",
            name: patientData?.patientName || "",
            date: "2023-07-29",
            patientId: patientData?.patientId || 0,
            age: patientData?.age || 0,
            gender: patientData?.gender || "",
            weight: patientData?.weight || 0,
            contactNumber: patientData?.contactnumber || 0,
          };
          // Create Registration
          const orderData = {
            address: order?.address || "",
            name: order?.patientName || "",
            date: "2023-07-29",
            patientId: order?.patientId || 0,
            age: order?.age || 0,
            gender: order?.gender || "",
            weight: order?.weight || 0,
            contactNumber: order?.contactnumber || 0,
          };

          // console.log("Appointment Data:", appointmentData);

          let response;
          // Make the API call
          if (patientData.patientId)
            response = await axiosInst.post(
              "/appointment/createAppointment",
              appointmentData
            );
          else
            response = await axiosInst.post(
              "/appointment/createRegisteration",
              orderData
            );

          //     // Handle the response if needed
          console.log("Appointment saved successfully!", response.data);

          //     // Update the state or do other actions as needed
          dispatch(addNewOrder(response.data.data[0]));
          setModalData(response.data.data[0]);
          setTokenCounter(response.data.data[0].id); // Increment the token counter
          handleShow();
          resetForm();
        } catch (error) {
          //     // Handle errors if the API call fails
          console.error("Error while saving appointment:", error);
        }
      })();
      // dispatch(addNewOrder(order));
      // setModalData(data);
      // setTokenCounter((prevCounter) => prevCounter + 1); // Increment the token counter
      // handleShow();
      // resetForm();
    }
  };

  const handleCheckboxChange = (patientId) => {
    setSelectedCheckbox(patientId);
  };

  // console.log(patientData);
  const buttonComponent = (
    <>
      <Button
        onClick={() => {
          if (selectedCheckbox !== null) {
            handleSearch(selectedCheckbox);
          } else {
            toast.error("Please select a patient.");
          }
        }}
        style={{ marginRight: "10px" }}
        disabled={selectedCheckbox === null}
      >
        Get
      </Button>
    </>
  );

  return (
    <>
      <p className="mt-3 mb-4 fw-bold patient_size">Add Patient Details</p>
      {/* spinner for loading */}
      {isLoading && (
        <div className="d-flex justify-content-end">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}{" "}
      {/* toaster notification */}
      <div>
        <ToastContainer position="top-center" />
      </div>
      <div className=" row mb-4">
        <div className="row">
          <div className=" col-md-9">
            <input
              className="form-control mr-sm-2"
              type="search"
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search For Patient"
              aria-label="Search"
            />
          </div>

          <div className=" col-md-3">
            {/* Update button visibility is controlled by isUpdateVisible state */}
            {!isUpdateVisible && (
              <button
                className="btn btn-outline-success search_width my-2 my-sm-0"
                type="submit"
                onClick={onSearch}
              >
                Search
              </button>
            )}

            {isUpdateVisible && (
              <button
                className="btn btn-success search_width my-2 my-sm-0"
                type="submit"
                onClick={() => onUpdate(selectedPatient)}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
      <StyledModal
        show={searchModalVisible}
        onHide={() => {
          setSearchModalVisible(false);
          resetForm();
        }}
        title="Patient Details"
        buttonComponent={buttonComponent}
      >
        <div className="modal-sm">
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table className="table">
              <thead
                style={{ position: "sticky", top: 0, background: "white" }}
              >
                <tr>
                  <th>Patient ID</th>
                  <th>Select</th>
                  <th>Patient Name</th>
                  <th>Contact Number</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {multiplePatients.map((patient) => (
                  <tr key={patient.patientId}>
                    <th>{patient.patientId}</th>
                    <td>
                      <input
                        type="radio"
                        id={`patientRadio${patient.patientId}`}
                        name="patientRadioGroup"
                        label={patient.patientName}
                        value={patient.patientId}
                        checked={selectedCheckbox === patient.patientId}
                        onChange={() => handleCheckboxChange(patient.patientId)}
                      />
                    </td>
                    <td>{patient.patientName}</td>
                    <td>{patient.contactnumber}</td>
                    <td>{patient.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </StyledModal>
      {/* <hr /> */}
      <MyVerticallyCenteredModal
        show={modalShow}
        data={modalData}
        onHide={() => setModalShow(false)}
      />
      <RePrint
        printData={selectedPatientData.data || {}}
        show={printModalVisible}
        onHide={() => {
          setPrintModalVisible(false);
          resetForm(); // reset the form so the save will be avoided
        }}
      />
      {/* <Print
        bookingOrder={bookingOrder}
        selectedSingleData={selectedSingleData}
        show={printModalVisible}
        onHide={() => setPrintModalVisible(false)}
      /> */}
      <form className="row g-3">
        <Row>
          {bookingFields?.length > 0 &&
            bookingFields.map((ele, index) => {
              if (ele.optional) return "";
              if (ele.field === "date") {
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = (currentDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0");
                const day = currentDate.getDate().toString().padStart(2, "0");
              }
              if (ele.optional) return "";
              if (ele.field === "location") {
                const currentLocation = "Chirala";
              }
              if (ele.inputType === "inputbox") {
                return (
                  <div
                    key={ele.field}
                    className={`${
                      ele.field === "age"
                        ? "col-md-3"
                        : ele.field === "address"
                        ? "col"
                        : "col-md-6"
                    }`}
                  >
                    <InputControl
                      name={ele.field}
                      reset={resetFields}
                      label={ele.displayName}
                      className={ele.className}
                      type={ele.type}
                      disabled={ele.disabled}
                      placeholder={ele.placeholder}
                      required={ele.required}
                      // value={ele.value || patientData[ele.field] || ""}
                      value={
                        ele.value ||
                        patientData?.[ele.field] ||
                        selectedSingleData[ele.field] ||
                        ""
                      }
                      onChange={(txt) => {
                        onFieldChange(txt, ele.field);
                      }}
                      validationMsg={errors[ele.field]}
                    />
                    {errors[ele.field] && (
                      <small className="error">{errors[ele.field]}</small>
                    )}
                  </div>
                );
              }

              if (ele.inputType === "selectbox") {
                return (
                  <div key={ele.field} className="col-md-3">
                    <GenderInput
                      label={ele.displayName}
                      value={
                        gender || (patientData && patientData.gender) || ""
                      }
                      onChange={(txt) => {
                        onFieldChange(txt, ele.field);
                      }}
                      validationMsg={errors.gender}
                    />
                    {errors.gender && (
                      <small className="error">{errors.gender}</small>
                    )}
                  </div>
                );
              }
              // if (ele.inputType === "mobileNo") {
              //   return (
              //     <div key={ele.field}>
              //       <label className={ele.className}>
              //         {ele.displayName}
              //       </label>
              //       <PhoneInput
              //         country={"in"}
              //         value={phoneNumber}
              //         onChange={(value) =>
              //           onFieldChange(value, "phoneNumber")
              //         }
              //         inputProps={{
              //           name: ele.field,
              //           required: true,
              //         }}
              //         validationMsg={errors.phoneNumber}
              //       />
              //       {errors.phoneNumber && (
              //         <small className="error">{errors.phoneNumber}</small>
              //       )}
              //     </div>
              //   );
              // }
              return null;
            })}
        </Row>
        <div className="row">
          <div className=" col-md-6 my-4">
            <button
              type="button"
              className="btn btn_clear search_width"
              onClick={resetForm}
            >
              Clear
            </button>
          </div>
          <div className="col-md-6 my-4">
            {!isPrintButtonVisible && (
              <button
                type="button"
                className="btn btn_save search_width"
                onClick={onSave}
              >
                Save
              </button>
            )}
            {/* Show the Print button if isPrintButtonVisible is true */}
            {isPrintButtonVisible && (
              <button
                type="button"
                className="btn btn_save search_width"
                onClick={handlePrintModalOpen}
              >
                Print
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminProfile;
