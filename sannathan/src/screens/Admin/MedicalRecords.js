import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdditionalDetails,
  emptyAdditionalDetails,
} from "../../redux/reducer/upLiftReducer";
import InputModal from "../appointments/InputModal";
import { Col, Row } from "react-bootstrap";
import InputButton from "../../components/InputButton";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import useAxiosPost from "../../api/useAxiosPost";
import PrescriptionUsageModal from "./PrescriptionUsageModal ";
import SuggestionUsageModal from "./SuggestionUsageModal";

function MedicalRecords({ prescriptionData, patientData }) {
  console.log(patientData);
  const axiosInst = useAxiosPost();
  const dispatch = useDispatch();
  const medicalRecord =
    useSelector((state) => state.upLift.additionalData) || [];

  const [addShow, setAddShow] = useState(false);
  const [val, setVal] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);
  const [prescriptionValues, setPrescriptionValues] = useState([]);
  const [usageModalShow, setUsageModalShow] = useState(false);
  const [selectedPrescriptionUsage, setSelectedPrescriptionUsage] =
    useState("");
  const [selectedPrescriptionTitle, setSelectedPrescriptionTitle] =
    useState("");
  const [selectedPrescriptionData, setSelectedPrescriptionData] = useState([]);
  const [prescriptionSearchResults, setPrescriptionSearchResults] = useState(
    []
  );

  const [suggestionModalShow, setSuggestionModalShow] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);
  const [selectedSuggestionData, setSelectedSuggestionData] = useState([]);
  const [selectedSuggestionCodes, setSelectedSuggestionCodes] = useState([]);
  const [selectedSuggestionTitle, setSelectedSuggestionTitle] = useState("");
  const [suggestionUsageModalShow, setSuggestionUsageModalShow] =
    useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [diagnosisModalShow, setDiagnosisModalShow] = useState(false);
  const [selectedDiagnosiss, setSelectedDiagnosiss] = useState([]);
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [selectedDiagnosisData, setSelectedDiagnosisData] = useState([]);
  const [selectedDiagnosisName, setSelectedDiagnosisName] = useState([]);

  const [medicalCategoryModalShow, setMedicalCategoryModalShow] =
    useState(false);
  const [selectedMedicalCategories, setSelectedMedicalCategories] = useState(
    []
  );
  const [medicalCategoryList, setMedicalCategoryList] = useState([]);
  const [selectedMedicalCategoryiesData, setSelectedMedicalCategoryiesData] =
    useState([]);
  const [selectedMedicalCategoriesName, setSelectedMedicalCategoriesName] =
    useState([]);

  const selectedPrescription = prescriptionList.find(
    (prescription) =>
      prescription.prescriptionTitle === selectedPrescriptionUsage
  );
  const onClick = () => setAddShow(true);

  useEffect(() => {
    // Set initial state based on the passed prescriptionData
    if (prescriptionData) {
      setSelectedPrescriptions([prescriptionData]);
    }
  }, [prescriptionData]);

  // prescription
  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const response = await axiosInst.get("/master/prescription");
        if (Array.isArray(response.data.data)) {
          setPrescriptionList(response.data.data);

          // Set initial selected prescriptions based on fetched data
          const initialSelectedPrescriptions = response.data.data
            .filter((prescription) =>
              // Check if the prescription should be pre-selected based on the data
              patientData[0]?.prescription?.includes(
                prescription.prescriptionTitle
              )
            )
            .map((prescription) => prescription.prescriptionCode);

          setSelectedPrescriptions(initialSelectedPrescriptions);
        } else {
          console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchPrescriptionData();
  }, []);

  // suggestion
  useEffect(() => {
    const fetchSuggestionData = async () => {
      try {
        const response = await axiosInst.get("/master/suggestion");
        if (Array.isArray(response.data.data)) {
          setSuggestionList(response.data.data);

          // Set initial selected suggestions based on fetched data
          const initialSelectedSuggestions = response.data.data
            .filter((suggestion) =>
              // Check if the suggestion should be pre-selected based on the data
              patientData[0]?.suggestions?.includes(suggestion.suggestionCode)
            )
            .map((suggestion) => suggestion.suggestionCode);

          setSelectedSuggestionCodes(initialSelectedSuggestions);
        } else {
          console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching suggestion data:", error);
      }
    };

    fetchSuggestionData();
  }, []);

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      try {
        const response = await axiosInst.get("/master/diagnosis");
        if (Array.isArray(response.data.data)) {
          setDiagnosisList(response.data.data);

          // Set initial selected diagnoses based on fetched data
          const initialSelectedDiagnoses = response.data.data
            .filter((diagnosis) =>
              // Check if the diagnosis should be pre-selected based on the data
              patientData[0]?.diagnosis?.includes(diagnosis.diagnosisName)
            )
            .map((diagnosis) => diagnosis.diagnosisName);

          setSelectedDiagnosisName(initialSelectedDiagnoses);
        } else {
          console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching diagnosis data:", error);
      }
    };

    fetchDiagnosisData();
  }, []);

  useEffect(() => {
    const fetchMedicalCategoryData = async () => {
      try {
        const response = await axiosInst.get("/master/medicalcategory");
        if (Array.isArray(response.data.data)) {
          setMedicalCategoryList(response.data.data);

          // Set initial selected medical categories based on fetched data
          const initialSelectedMedicalCategoryIds =
            [patientData[0]?.medicalCategory] || [];
          const initialSelectedMedicalCategoryNames = response.data.data
            .filter((medicalcategory) =>
              // Check if the medical category should be pre-selected based on the data
              initialSelectedMedicalCategoryIds.includes(
                medicalcategory.medicalCategoryId
              )
            )
            .map((medicalcategory) => medicalcategory.medicalCategoryId);

          setSelectedMedicalCategoriesName(initialSelectedMedicalCategoryNames);
        } else {
          console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching medical category data:", error);
      }
    };

    fetchMedicalCategoryData();
  }, [patientData]);

  // ...

  const handleTogglePrescription = (prescriptionCode, usage) => {
    setSelectedPrescriptions((prevSelected) =>
      prevSelected.includes(prescriptionCode)
        ? prevSelected.filter((code) => code !== prescriptionCode)
        : [...prevSelected, prescriptionCode]
    );
    setSelectedPrescriptionTitle(prescriptionCode);
    setSelectedPrescriptionUsage(usage);
  };
  const handleToggleSuggestion = (suggestionCode) => {
    setSelectedSuggestionCodes((prevSelected) =>
      prevSelected.includes(suggestionCode)
        ? prevSelected.filter((code) => code !== suggestionCode)
        : [...prevSelected, suggestionCode]
    );

    setSelectedSuggestions((prevSelected) =>
      prevSelected.map((suggestion) =>
        suggestion.suggestionCode === suggestionCode
          ? { ...suggestion, isSelected: !suggestion.isSelected }
          : suggestion
      )
    );
  };
  const handleToggleDiagnosis = (diagnosisName) => {
    setSelectedDiagnosisName((prevSelected) =>
      prevSelected.includes(diagnosisName)
        ? prevSelected.filter((name) => name !== diagnosisName)
        : [...prevSelected, diagnosisName]
    );

    setSelectedDiagnosiss((prevSelected) =>
      prevSelected.map((diagnosis) =>
        diagnosis.diagnosisName === diagnosisName
          ? { ...diagnosis, isSelected: !diagnosis.isSelected }
          : diagnosis
      )
    );
  };
  const handleToggleMedicalCategory = (medicalCategoryName) => {
    setSelectedMedicalCategoriesName((prevSelected) =>
      prevSelected.includes(medicalCategoryName)
        ? prevSelected.filter((name) => name !== medicalCategoryName)
        : [...prevSelected, medicalCategoryName]
    );

    setSelectedMedicalCategories((prevSelected) =>
      prevSelected.map((medicalcategory) =>
        medicalcategory.medicalCategoryName === medicalCategoryName
          ? { ...medicalcategory, isSelected: !medicalcategory.isSelected }
          : medicalcategory
      )
    );
  };

  const onSavePrescriptions = async () => {
    const selectedData = selectedPrescriptions.map((prescriptionCode) => {
      const prescription = prescriptionList.find(
        (prescription) => prescription.prescriptionCode === prescriptionCode
      );
      return prescription;
    });

    setSelectedPrescriptionData(selectedData);
    setAddShow(false);
    setUsageModalShow(true);

    try {
      const patientId = patientData[0].patientId;
      const prescriptionText = selectedData
        .map((prescription) => prescription.prescriptionTitle)
        .join(", ");

      const response = await axiosInst.post(
        `/appointment/updatePrescription?patientId=${patientId}&prescription=${encodeURIComponent(
          prescriptionText
        )}`
      );
      console.log("Prescription data updated on the server.", response.data);
      // setSelectedPrescriptionData([]);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response from server:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const onSaveSuggestions = async () => {
    const selectedSuggestionData = suggestionList.filter((suggestion) =>
      selectedSuggestionCodes.includes(suggestion.suggestionCode)
    );

    setSelectedSuggestionData(selectedSuggestionData);
    setSuggestionModalShow(false);
    setSuggestionUsageModalShow(true);

    try {
      const patientId = patientData[0].patientId;
      const suggestionText = selectedSuggestionData
        .map((suggestion) => suggestion.suggestionDesc)
        .join(", ");

      // Make an Axios POST request to the server
      await axiosInst.post(
        `/appointment/updateSuggestions?patientId=${patientId}&suggestions=${encodeURIComponent(
          suggestionText
        )}`
      );

      console.log("Suggestions data updated on the server.");

      // Clear selected data (if needed)
      // setSelectedSuggestionData([]);
    } catch (error) {
      console.error("Error updating suggestions data:", error);
    }
  };

  const onSaveDiagnosis = async () => {
    const selectedDiagnosisData = diagnosisList.filter((diagnosis) =>
      selectedDiagnosisName.includes(diagnosis.diagnosisName)
    );

    setSelectedDiagnosisData(selectedDiagnosisData);
    setDiagnosisModalShow(false);

    try {
      const patientId = patientData[0].patientId;
      const diagnosisText = selectedDiagnosisData
        .map((diagnosis) => diagnosis.diagnosisName)
        .join(", ");

      // Make an Axios POST request to update diagnosis data on the server
      await axiosInst.post(
        `/appointment/updateDiagnosis?patientId=${patientId}&diagnosis=${encodeURIComponent(
          diagnosisText
        )}`
      );

      console.log("Diagnosis data updated on the server.");

      // Clear selected data (if needed)
      // setSelectedDiagnosisData([]);
    } catch (error) {
      console.error("Error updating diagnosis data:", error);
    }
  };

  const handleMedicalSave = (e) => {
    e.preventDefault();
    onExcuteDispatch();
  };

  // const handleMedicalSave = (e) => {
  //   e.preventDefault();
  //   onExcuteDispatch();
  // };

  const onExcuteDispatch = () => {
    dispatch(emptyAdditionalDetails());
    // prescription
    let prescriptionArray = selectedPrescriptionData.map(
      (ele) => ele.prescriptionCode
    );
    let prescriptionText = prescriptionArray.join(",");
    let prescriptionUsageArray = selectedPrescriptionData.map(
      (ele) => ele.usage
    );
    let prescriptionUsageText = prescriptionUsageArray.join(" , ");
    // suggestion
    let suggestionArray = selectedSuggestionData.map(
      (ele) => ele.suggestionCode
    );
    let suggestionText = suggestionArray.join(",");

    let suggestionUsageArray = selectedSuggestionData.map(
      (ele) => ele.suggestionDesc
    );
    let suggestionUsageText = suggestionUsageArray.join(" , ");

    let diagnosisArray = selectedDiagnosisData.map((ele) => ele.diagnosisName);
    let diagnosisText = diagnosisArray.join(",");

    // Access and display the patient ID from patientData
    const patientId = patientData[0].patientId;
    console.log("Patient ID:", patientId);
    dispatch(
      addAdditionalDetails({
        id: patientId,
        userRole: "Admin",
        prescription: prescriptionText,
        usage: prescriptionUsageText,
        suggestion: suggestionText,
        description: suggestionUsageText,
        diagnosis: diagnosisText,
      })
    );
    // reset the prescription
    // setSelectedPrescriptionData([]);
  };
  // Reusable search function
  const handleSearch = (field, data, setter) => {
    const filtered = data.filter((item) =>
      item[field].toLowerCase().includes(val.toLowerCase())
    );
    setter(filtered);
  };
  // const handleSave = (e) => {
  //   e.preventDefault();
  //   onSave(selectedValues);
  // };
  // const onSave = (e) => {
  //   e.preventDefault();
  //   setAddShow(false);
  // };
  // console.log("prescriptionList:", prescriptionList);
  return (
    <div>
      {/* suggestion */}
      <SuggestionUsageModal
        show={suggestionUsageModalShow}
        onHide={() => setSuggestionUsageModalShow(false)}
        suggestionData={selectedSuggestionData}
      />
      <InputModal
        show={suggestionModalShow}
        onHide={() => setSuggestionModalShow(false)}
        onSave={onSaveSuggestions}
        dialogClassName="fullscreen-modal"
      >
        <div className="modal-height">
          <div className="main-login main-center">
            <div className="">
              <div class="input-group">
                <input
                  label="select"
                  type="search"
                  class="form-control"
                  id="mySearch"
                  name="q"
                  placeholder="Search"
                  aria-label="Search through site content"
                  value={val}
                  // value={val || selectedSuggestionCodes}
                  onChange={(e) => {
                    const inputValue = e.target.value.toUpperCase(); // Convert input to uppercase
                    setVal(e.target.value);

                    // Update the suggestion list based on the input value
                    const filteredSuggestions = suggestionList.filter(
                      (suggestion) =>
                        suggestion.suggestionDesc
                          .toUpperCase()
                          .includes(inputValue) ||
                        suggestion.suggestionCode
                          .toUpperCase()
                          .includes(inputValue)
                    );
                    setSearchResults(filteredSuggestions);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && val === "") {
                      // Restore the full suggestion list when Backspace is pressed and input is empty
                      setSuggestionList(suggestionList);
                    }
                  }}
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary search"
                    // onClick={}
                    type="button"
                  >
                    Search
                  </button>
                  {/* <button class="btn btn-outline-secondary search" type="button">
                      Cancel
                    </button> */}
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table">
                <tbody>
                  {Array(
                    Math.ceil(
                      (searchResults.length || suggestionList.length) / 6
                    )
                  )
                    .fill()
                    .map((_, rowIndex) => (
                      <tr key={rowIndex}>
                        {(searchResults.length ? searchResults : suggestionList)
                          .slice(rowIndex * 6, rowIndex * 6 + 6)
                          .map((suggestion, colIndex) => (
                            <td key={colIndex}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedSuggestionCodes.includes(
                                    suggestion.suggestionCode
                                  )}
                                  onChange={() =>
                                    handleToggleSuggestion(
                                      suggestion.suggestionCode
                                    )
                                  }
                                />
                                {suggestion.suggestionCode}
                              </label>
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </InputModal>
      {/* Diagnosis */}
      <InputModal
        show={diagnosisModalShow}
        onHide={() => setDiagnosisModalShow(false)}
        onSave={onSaveDiagnosis}
      >
        <div className="modal-height-lg">
          <div className="main-login main-center">
            <div className="">
              <div class="input-group">
                <input
                  label="select"
                  type="search"
                  class="form-control"
                  id="mySearch"
                  name="q"
                  placeholder="Search"
                  aria-label="Search through site content"
                  value={selectedDiagnosisName}
                  onChange={(e) => setVal(e.target.value)}
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary search"
                    // onClick={}
                    type="button"
                  >
                    Search
                  </button>
                  {/* <button class="btn btn-outline-secondary search" type="button">
                      Cancel
                    </button> */}
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table">
                <tbody>
                  {Array(Math.ceil(diagnosisList.length / 5))
                    .fill()
                    .map((_, rowIndex) => (
                      <tr key={rowIndex}>
                        {diagnosisList
                          .slice(rowIndex * 5, rowIndex * 5 + 5)
                          .map((diagnosis, colIndex) => (
                            <td key={colIndex}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedDiagnosisName.includes(
                                    diagnosis.diagnosisName
                                  )}
                                  onChange={() =>
                                    handleToggleDiagnosis(
                                      diagnosis.diagnosisName
                                    )
                                  }
                                />

                                {diagnosis.diagnosisName}
                              </label>
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </InputModal>
      {/* prescription */}
      <PrescriptionUsageModal
        show={usageModalShow}
        onHide={() => setUsageModalShow(false)}
        // prescriptionTitle={selectedPrescriptionTitle}
        // prescriptionUsage={selectedPrescriptionUsage}
        prescriptionData={selectedPrescriptionData}
      />
      <InputModal
        show={addShow}
        onHide={() => setAddShow(false)}
        onSave={onSavePrescriptions}
        dialogClassName="fullscreen-modal"
      >
        <div className="modal-height">
          <div className="main-login main-center">
            <div className="">
              <div class="input-group">
                <input
                  label="select"
                  type="search"
                  class="form-control"
                  id="mySearch"
                  name="q"
                  placeholder="Search"
                  aria-label="Search through site content"
                  value={val}
                  onChange={(e) => {
                    const inputValue = e.target.value.toUpperCase(); // Convert input to uppercase
                    setVal(e.target.value);

                    // Update the prescription list based on the input value
                    const filteredPrescriptions = prescriptionList.filter(
                      (prescription) =>
                        prescription.prescriptionTitle
                          .toUpperCase()
                          .includes(inputValue)
                    );
                    setPrescriptionSearchResults(filteredPrescriptions);
                  }}
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary search"
                    // onClick={}
                    type="button"
                  >
                    Search
                  </button>
                  {/* <button class="btn btn-outline-secondary search" type="button">
                      Cancel
                    </button> */}
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table">
                {/* <div className="px-2 modal-search-box">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      // onChange={(e) => toggleSelectAll(e.target.checked)}
                    />
                    Select All
                  </label>
                </div> */}

                <tbody>
                  {Array(
                    Math.ceil(
                      (prescriptionSearchResults.length ||
                        prescriptionList.length) / 6
                    )
                  )
                    .fill()
                    .map((_, rowIndex) => (
                      <tr key={rowIndex}>
                        {(prescriptionSearchResults.length
                          ? prescriptionSearchResults
                          : prescriptionList
                        )
                          .slice(rowIndex * 6, rowIndex * 6 + 6)
                          .map((prescription, colIndex) => (
                            <td key={colIndex}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedPrescriptions.includes(
                                    prescription.prescriptionCode
                                  )}
                                  onChange={() =>
                                    handleTogglePrescription(
                                      prescription.prescriptionCode,
                                      prescription.usage
                                    )
                                  }
                                />
                                {prescription.prescriptionTitle}
                              </label>
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </InputModal>
      {/* Medical Category */}
      <InputModal
        show={medicalCategoryModalShow}
        onHide={() => setMedicalCategoryModalShow(false)}
        // onSave={onSaveDiagnosis}
      >
        <div className="modal-height-lg">
          <div className="main-login main-center">
            <div className="">
              <div class="input-group">
                <input
                  label="select"
                  type="search"
                  class="form-control"
                  id="mySearch"
                  name="q"
                  placeholder="Search"
                  aria-label="Search through site content"
                  value={selectedMedicalCategoriesName}
                  onChange={(e) => setVal(e.target.value)}
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary search"
                    // onClick={}
                    type="button"
                  >
                    Search
                  </button>
                  {/* <button class="btn btn-outline-secondary search" type="button">
                      Cancel
                    </button> */}
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table">
                <tbody>
                  {Array(Math.ceil(medicalCategoryList.length / 4))
                    .fill()
                    .map((_, rowIndex) => (
                      <tr key={rowIndex}>
                        {medicalCategoryList
                          .slice(rowIndex * 4, rowIndex * 4 + 4)
                          .map((medicalcategory, colIndex) => (
                            <td key={colIndex}>
                              <label>
                                <input
                                  type="checkbox"
                                  // checked={selectedMedicalCategoriesName.includes(
                                  //   medicalcategory.medicalCategoryName
                                  // )}
                                  // onChange={() =>
                                  //   handleToggleMedicalCategory(
                                  //     medicalcategory.medicalCategoryName
                                  //   )
                                  // }
                                  checked={selectedMedicalCategoriesName.includes(
                                    medicalcategory.medicalCategoryId.toString()
                                  )}
                                  onChange={() =>
                                    handleToggleMedicalCategory(
                                      medicalcategory.medicalCategoryId.toString()
                                    )
                                  }
                                />

                                {medicalcategory.medicalCategoryName}
                              </label>
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </InputModal>

      <div>
        <form className="form-group my-3" method="post" action="#">
          <Row>
            <Col md={6}>
              <InputButton
                label={"PRESCRIPTION"}
                placeholder={
                  selectedPrescriptions.length > 0
                    ? selectedPrescriptions.join(", ")
                    : patientData && patientData.length > 0
                    ? patientData[0].prescription
                    : ""
                }
                value={
                  selectedPrescriptions.length > 0
                    ? selectedPrescriptions.join(", ")
                    : ""
                }
                onClick={() => {
                  setAddShow(true);
                }}
              />
            </Col>

            <Col md={6}>
              <InputButton
                label={"PREFERENCE"}
                // placeholder={selectedPrescriptions.join(", ")}
                // value={selectedPrescriptions.join(", ")}
                // onClick={() => setAddShow(true)}
              />
            </Col>
            <Col md={6}>
              <InputButton
                label={"CURRENT MEDICAL CATEGORY"}
                placeholder={
                  selectedMedicalCategoriesName.length > 0
                    ? selectedMedicalCategoriesName.join(", ")
                    : patientData && patientData.length > 0
                    ? patientData[0].medicalCategory
                    : ""
                }
                value={
                  selectedMedicalCategoriesName.length > 0
                    ? selectedMedicalCategoriesName.join(", ")
                    : ""
                }
                // placeholder={selectedMedicalCategoriesName.join(", ")}
                // value={selectedMedicalCategoriesName.join(", ")}
                onClick={() => setMedicalCategoryModalShow(true)}
              />
            </Col>
            <Col md={6}>
              <InputButton
                label={"ORIGINAL MEDICAL CATEGORY"}
                // placeholder={patientData[0].originalMedicalCategory}
                // value={selectedPrescriptions.join(", ")}
                // onClick={() => setAddShow(true)}
              />
            </Col>
            <Col md={6}>
              <InputButton
                label={"DIAGNOSIS"}
                placeholder={
                  selectedDiagnosisName.length > 0
                    ? selectedDiagnosisName.join(", ")
                    : patientData && patientData.length > 0
                    ? patientData[0].diagnosis
                    : ""
                }
                // value={
                //   selectedDiagnosisName.length > 0
                //     ? selectedDiagnosisName.join(", ")
                //     : ""
                // }
                // placeholder={selectedDiagnosisName.join(", ")}
                // value={selectedDiagnosisName.join(", ")}
                onClick={() => setDiagnosisModalShow(true)}
              />
            </Col>
            <Col md={6}>
              <InputButton
                label={"FREE MEDICINE"}
                // placeholder={selectedPrescriptions.join(", ")}
                // value={selectedPrescriptions.join(", ")}
                // onClick={() => setAddShow(true)}
              />
            </Col>
            <Col md={6}>
              <InputButton
                label={"SUGGESTION"}
                placeholder={
                  selectedSuggestionCodes.length > 0
                    ? selectedSuggestionCodes.join(", ")
                    : patientData && patientData.length > 0
                    ? patientData[0].suggestions
                    : ""
                }
                value={
                  selectedSuggestionCodes.length > 0
                    ? selectedSuggestionCodes.join(", ")
                    : ""
                }
                // placeholder={selectedSuggestionCodes.join(", ")}
                // value={selectedSuggestionCodes.join(", ")}
                onClick={() => setSuggestionModalShow(true)}
              />
            </Col>
            <Col md={6} className="mb-3">
              <InputButton
                label={"DISEASE STATUS"}
                // placeholder={selectedPrescriptions.join(", ")}
                // value={selectedPrescriptions.join(", ")}
                // onClick={() => setAddShow(true)}
              />
            </Col>
          </Row>

         
          <div class="row">
            <div class=" col-md-2 offset-md-10 mb-1">
              <button
                type="button"
                class="btn btn_save search_width"
                onClick={handleMedicalSave}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MedicalRecords;
