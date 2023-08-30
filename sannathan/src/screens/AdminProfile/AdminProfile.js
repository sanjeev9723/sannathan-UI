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
// import Styles from "./"

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

  // const [ selectedSingleData, setSelectedSingleData]= useState({})
  const selectedSingleData = {};

  // const [patientId, setPatientID] = useState("");
  const [mobileNo, setMobileNo] = useState("");
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
    // console.log(selectedPatientData);
    setPatientId(selectedPatientData.message || "");

    // Create a mapping object to map field names in bookingFields to selectedPatientData keys
    const fieldToDataMap = {
      date: "appointmentDate",
      address: "address",
      name: "name",
      gender: "gender",
      age: "age",
      weight: "weight",
      contactNumber: "phoneNumber",
    };

    // Check if selectedPatientData is not null or undefined
    if (
      selectedPatientData &&
      !Array.isArray(selectedPatientData) &&
      bookingFields.length > 0
    ) {
      const updatedBookingFields = bookingFields.map((field) => {
        if (fieldToDataMap.hasOwnProperty(field.field)) {
          const dataField = fieldToDataMap[field.field];
          if (selectedPatientData.hasOwnProperty(dataField)) {
            return { ...field, value: selectedPatientData[dataField] };
          }
        }
        return field;
      });

      // console.log("updatedBookingFields:", updatedBookingFields);
      setBookingOrder(updatedBookingFields);

      // When selectedPatientData is updated and it has data, show the Print button
      setIsPrintButtonVisible(true);
    } else {
      // Hide the Print button when selectedPatientData is not available or doesn't have data
      setIsPrintButtonVisible(false);
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
    if (!patientId) {
      toast.error("Please enter a patient ID");
      return;
    }

    try {
      const { data } = await axiosInst.get(`/admin/getPatientDetails`, {
        params: {
          // pId: patientId,
          patientId: patientId,

          // pContact: patientId,
        },
      });
      setIsLoading(false);
      setPatientData(data.data[0]);
      setGender(data.data[0].gender || "");
      // setPhoneNumber(data.data[0].phoneNumber || "");
      console.log(data.data[0]);
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
  // patient details in modal
  const onUpdate = (patientData) => {
    navigate(`/adminpage`, {
      state: {
        patientData: [patientData],
      },
    });
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
      order.gender = gender || patientData.gender || "";
      order.phoneNumber = phoneNumber || patientData.phoneNumber || "";
      bookingOrder.forEach(({ field, displayName, value }) => {
        order[field] = value;
        data[displayName] = value;
      });
      (async () => {
        try {
          // Create the appointment object with the required data
          let formData = patientData || {};
          formData = { ...order, ...formData };
          const appointmentData = {
            address: formData.address || "",
            name: formData.name || "",
            date: "2023-07-29",
            patientId: formData.patientId || 0,
            age: formData.age || 0,
            gender: formData.gender || "",
            weight: formData.weight || 0,
            contactNumber: formData.contactNumber || 0,
          };
          // console.log(appointmentData);

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
              appointmentData
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

  return (
    <div className="bookOrder  ">
      <h4 className="head-1">Add Patient Details</h4>
      {/* spinner for loading */}
      {isLoading && (
        <div class="d-flex justify-content-end">
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}{" "}
      {/* toaster notification */}
      <div>
        <ToastContainer position="top-center" />
      </div>
      <Row style={{ alignItems: "end" }}>
        <Col md={6}>
          <SearchInput
            name="searchInput"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Patient Id"
          />
        </Col>
        <Col md={4}>
          <button
            type="button"
            className="btn btn-primary rounded w-50 px-2"
            onClick={onSearch}
          >
            Search
          </button>
        </Col>
        <Col md={2}>
          {/* Update button visibility is controlled by isUpdateVisible state */}
          {isUpdateVisible && (
            <button
              type="button"
              className="btn btn-primary rounded"
              onClick={() => onUpdate(selectedPatient)}
            >
              Update
            </button>
          )}
        </Col>
      </Row>
      <hr />
      <MyVerticallyCenteredModal
        show={modalShow}
        data={modalData}
        onHide={() => setModalShow(false)}
      />
      <Print
        bookingOrder={bookingOrder}
        selectedSingleData={selectedSingleData}
        show={printModalVisible}
        onHide={() => setPrintModalVisible(false)}
      />
      <div className="main-login main-center">
        <form className="form-horizontal" method="post" action="#">
          <div className="row">
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
                    const day = currentDate
                      .getDate()
                      .toString()
                      .padStart(2, "0");
                    return (
                      <div
                        key={ele.field}
                        className={`${!ele.newline ? "col date" : ""}`}
                      >
                        <label>{`${ele.displayName}: ${day}-${month}-${year}`}</label>
                      </div>
                    );
                  }
                  if (ele.optional) return "";
                  if (ele.field === "location") {
                    const currentLocation = "Chirala";
                    return (
                      <div
                        key={ele.field}
                        className={`${!ele.newline ? "col location" : ""}`}
                      >
                        <label>{`${ele.displayName}: ${currentLocation}`}</label>
                      </div>
                    );
                  }
                  if (ele.inputType === "inputbox") {
                    return (
                      <div
                        style={
                          ele.field === "name"
                            ? {
                                width: "396px",
                                paddingRight: "0px",
                                display: "inline-block",
                              }
                            : ele.field === "age"
                            ? {
                                paddingRight: "10px",
                              
                              }
                            : ele.field === "weight"
                            ? {
                             
                              paddingLeft: "7px",
                              paddingRight: "0px",
                              }
                            : ele.field === "contactNumber"
                            ? {
                                width: "394px",
                                paddingLeft: "26px",
                                display: "inline-block",
                              }
                            : {}
                        }
                        key={ele.field}
                        className={`${!ele.newline ? "col" : ""}`}
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
                      <div
                        style={
                          ele.field === "gender"
                            ? {
                                width: "350px",
                                marginTop: "1px",
                                display: " inline-block",
                                paddingLeft: "23px",
                              }
                            : {}
                        }
                        key={ele.field}
                        // className={`${!ele.newline ? "col" : ""}`}
                      >
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
          </div>
          <div class="d-grid gap-2 ">
            <button
              class="btn btn-primary additional"
              type="button"
              onClick={() => {
                gotoPage("centeredmodal");
              }}
            >
              Additional Details
            </button>
          </div>
          {/* <div class="d-grid gap-2 ">
            <BasicAccordion
              items={[
                {
                  title: "Additional Details",
                  content: (
                    
                  <CenteredModal/>
                  ),
                },
              ]}
            />
            </div> */}
          <div className="d-flex justify-content-center  save-flex">
            <button
              type="button"
              className="btn btn-primary rounded cancel "
              onClick={resetForm}
            >
              Clear
            </button>
            {/* Show the Save button if isPrintButtonVisible is false */}
            {!isPrintButtonVisible && (
              <button
                type="button"
                className="btn btn-primary rounded save "
                onClick={onSave}
              >
                Save
              </button>
            )}
            {/* Show the Print button if isPrintButtonVisible is true */}
            {isPrintButtonVisible && (
              <button
                type="button"
                className="btn btn-primary rounded save"
                onClick={handlePrintModalOpen}
              >
                Print
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
