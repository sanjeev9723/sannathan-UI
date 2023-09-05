import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Col, Row } from "react-bootstrap";
import HeaderMenu from "../../components/HeaderMenu";
import InputControl from "../../components/InputControl";
import Select from "../../components/Select.js";
import MyVerticallyCenteredModal from "../appointments/modal";
import CenteredModal from "../appointments/AdditionalDetails";
import GenderInput from "../appointments/GenderInput";
import InputSearch from "../../components/InputSearch";
import { addNewOrder } from "../../redux/reducer/AppointmentReducer";
import AdminNavbar from "../../components/AdminNavbar";
import MedicalRecords from "./MedicalRecords";
import BasicAccordion from "../../components/Accordion";
import SideNav from "../Navbar/SideNavUser ";
import useAxiosPost from "../../api/useAxiosPost";
import Print from "../appointments/print";
import { emptyAdditionalDetails } from "../../redux/reducer/upLiftReducer";

const AdminPage = (props) => {
  const location = useLocation();
  const patientData = location.state?.patientData || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const medicalRecord =
    useSelector((state) => state.upLift.additionalData) || [];
  //   console.log(patientData[0].patientId);
  // console.log(medicalRecord.filter((ele => ele.id == patientData[0].patientId)));
  // const singleMedicalData = medicalRecord.filter((ele => ele.id == patientData[0].patientId));
  // const bookingFields = useSelector(
  //   (state) => state.appointments.appointmentFields
  // );
  console.log(patientData);
  // console.log(singleMedicalData);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [modalShow, setModalShow] = useState(false);
  // const [modalData, setModalData] = useState({});
  const [bookingOrder, setBookingOrder] = useState([]);
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [patientId, setPatientId] = useState("");
  const [resetFields, setResetFields] = useState(false);
  const [printModalVisible, setPrintModalVisible] = useState(false);

  const [patientDetails, setPatientDetails] = useState({
    patientId: "",
    patientName: "",
    gender: "",
    age: "",
    weight: "",
    contactnumber: "",
    address: "",
    prescription: "",
    usage: "",
    diagnosis: "",
    suggestions: "",
  });
  const [printData, setPrintData] = useState({
    patientData: {},
    medicalRecords: [],
  });

  const handleShow = () => setModalShow(true);

  const onFieldChange = (value, field) => {};

  const axiosInst = useAxiosPost();

  const gotoPage = async (page) => {
    navigate(`/${page}`);
    // const {data} = await axiosInst.get('/appointment/getPatientId?pID=100');
    // console.log(data);
  };
  useEffect(() => {
    if (patientData && patientData.length > 0) {
      setPatientDetails({
        patientId: patientData[0].patientId || "",
        patientName: patientData[0].name || "",
        gender: patientData[0].gender || "",
        age: patientData[0].age || "",
        weight: patientData[0].weight || "",
        contactnumber: patientData[0].contactNumber || "",
        address: patientData[0].address || "",
        suggestions: patientData[0].suggestions || "",
        prescription: patientData[0].prescription || "",
        displayNoOfConsultations: patientData[0].displayNoOfConsultations || "",
        diagnosis: patientData[0].diagnosis || "",
      });
    }
  }, [patientData]);
  // console.log(patientData);

  // Reset form
  const resetForm = () => {};

  // Validate form
  const validateForm = () => {};

  const onSave = (e) => {
    e.preventDefault();

    // Validate the form
  };

  const handlePrintModalOpen = () => {
    setPrintData({
      patientData: {
        ...patientDetails,
        // prescription: medicalRecord[0]?.prescription || "",
        // usage: medicalRecord[0]?.usage || "",
      },
      medicalRecords: medicalRecord,
    });
    setPrintModalVisible(true);
  };
  console.log(patientData);

  const handleBack = () => {
    dispatch(emptyAdditionalDetails()); // Unload additional data
    gotoPage("adminacess"); // Navigate to the specified page
  };
  return (
    <div className=" overflow-auto">
      <HeaderMenu />
      <div className="admin-accordion">
      <AdminNavbar />
      </div>
   
      <div class="row mt-2">
        <div class=" col-md-2 offset-md-8 mb-2">
          <button
            type="button"
            class="float-end search_width btn btn_clear"
            onClick={handlePrintModalOpen}
          >
            Print
          </button>
        </div>
        <div class="col-md-2 mb-2">
          <button
            type="button"
            class="float-end search_width btn btn_save"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
      {/* <div className="d-flex justify-content-end mx-3">
        <button
          type="button"
          className="btn btn-primary rounded save-button px-5 my-2"
          onClick={handlePrintModalOpen}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary rounded cancel-button px-5 my-2 Button"
          onClick={handleBack}
        >
          Back
        </button>
      </div> */}

      <div className="patient-container">
        <div className="admin-content">
          <div className="patient-details">
            {printData.patientData && (
              <Print
                printData={printData}
                show={printModalVisible}
                onHide={() => setPrintModalVisible(false)}
              />
            )}
            <BasicAccordion
              headerClassName="custom-accordion-header" // Apply custom header class
              items={[
                {
                  title: "Patient Details",
                  content: (
                    <form
                      className="form-horizontal-details"
                      method="post"
                      action="#"
                    >
                      <Row>
                        <Col md={6}>
                          <InputControl
                            name="name"
                            type="text"
                            placeholder="Patient ID"
                            className="fas fa-user-alt"
                            id="nameInput"
                            value={patientDetails.patientId}
                            onChange={(value) => onFieldChange(value, "name")}
                            required={true}
                            validationMsg={errors.name}
                          />
                        </Col>

                        <Col md={6}>
                          <InputControl
                            name="name"
                            type="text"
                            placeholder="Patient Name"
                            className="fas fa-user-alt"
                            id="nameInput"
                            value={patientDetails.patientName}
                            onChange={(value) => onFieldChange(value, "name")}
                            required={true}
                            validationMsg={errors.name}
                          />
                        </Col>

                        <Col md={3}>
                          <InputControl
                            name="weight"
                            type="text"
                            placeholder="Gender"
                            className="fas fa-user-alt"
                            id="weightInput"
                            value={patientDetails.gender}
                            onChange={(value) => onFieldChange(value, "weight")}
                            required={true}
                            validationMsg={errors.weight}
                          />
                        </Col>
                        <Col md={3}>
                          <InputControl
                            name="age"
                            type="text"
                            placeholder="Patient Age"
                            className="fas fa-user-alt"
                            id="ageInput"
                            value={patientDetails.age}
                            onChange={(value) => onFieldChange(value, "age")}
                            required={true}
                            validationMsg={errors.age}
                          />
                        </Col>
                        <Col md={6}>
                          <InputControl
                            name="weight"
                            type="text"
                            placeholder="Patient Weight"
                            className="fas fa-user-alt"
                            id="weightInput"
                            value={patientDetails.weight}
                            onChange={(value) => onFieldChange(value, "weight")}
                            required={true}
                            validationMsg={errors.weight}
                          />
                        </Col>
                        <Col md={6}>
                          <InputControl
                            name="contact"
                            type="text"
                            placeholder="Patient Contact Number"
                            className="fas fa-user-alt"
                            id="contactInput"
                            value={patientDetails.contactnumber}
                            onChange={(value) =>
                              onFieldChange(value, "contact")
                            }
                            required={true}
                            validationMsg={errors.contact}
                          />
                        </Col>
                        <Col md={6}>
                          <InputControl
                            name="address"
                            type="text"
                            placeholder="Patient Address"
                            className="fas fa-user-alt"
                            id="addressInput"
                            value={patientDetails.address}
                            onChange={(value) =>
                              onFieldChange(value, "address")
                            }
                            required={true}
                            validationMsg={errors.address}
                          />
                        </Col>

                        <Col md={6} className="mb-3">
                          <InputControl
                            name="displayNoOfConsultations"
                            // label="No Of Consultations"
                            type="text"
                            placeholder="No Of Consultations"
                            className="fas fa-user-alt"
                            id="nameInput"
                            value={patientDetails.displayNoOfConsultations}
                            onChange={(value) => onFieldChange(value, "name")}
                            required={true}
                            validationMsg={errors.displayNoOfConsultations}
                          />
                        </Col>
                      </Row>

                      
                      <div class="row">
                        <div class="col-md-2 offset-md-10 mb-1">
                          <button
                            type="button"
                            class="btn btn_save search_width"
                            onClick={onSave}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  ),
                },
              ]}
            />
          </div>
          <hr></hr>

          <div className="medical-records">
            <BasicAccordion
              items={[
                {
                  title: "Medical Records",
                  content: (
                    <div className="box-admin">
                      <div className="admin">
                        <MedicalRecords patientData={patientData} />
                        {/* <MedicalRecords  prescriptionData={patientDetails.prescription} /> */}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
