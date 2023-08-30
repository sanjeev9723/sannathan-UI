import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import sannathan from "../images/sannathan.png";

function Print(props) {
  const componentRef = useRef(null);
  const { printData } = props;
  const patientData = printData?.patientData || {};
  const medicalRecords = printData?.medicalRecords || [];
  console.log(patientData);
  // Specify the keys you want to display in the modal
  const keysToDisplay = [
    { label: "Patient ID", key: "patientId" },
    { label: "Patient Name", key: "patientName" },
    { label: "No Of Consultations", key: "displayNoOfConsultations" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "Contact Number", key: "contactnumber" },
    { label: "Address", key: "address" },
    { label: "Prescription", key: "prescription" },
    // { label: "Usage", key: "usage" },
    {
      label: "Suggestion",
      key: medicalRecords.length === 0 ? "suggestions" : "suggestion",
    },
    // { label: "Description", key: "suggestionDesc" },
    {
      label: "Diagnosis",
      key: medicalRecords.length === 0 ? "diagnosis" : "diagnosisName",
    },

    // Add more keys as needed
  ];

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  });

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "print doc",
    removeAfterPrint: true,
  });
  const innerPrescription = (data, attrib1, attrib2) => {
    console.log(data);
    try {
      if (data[attrib1] && data[attrib2]) {
        const usage = data[attrib2].split(",");
        return data[attrib1].split(",").map((ele, index) => (
          <>
            <tr>
              <td></td>
              <td>
                <strong>{ele}</strong>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>{usage ? usage[index] : ""}</td>
            </tr>
          </>
        ));
      }
    } catch (e) {
      console.log(e);
    }
    return "";
  };
  const innerSuggestion = (data, attrib1, attrib2) => {
    console.log(data);
    try {
      if (data[attrib1] && data[attrib2]) {
        const suggestionDesc = data[attrib2].split(",");
        return data[attrib1].split(",").map((ele, index) => (
          <>
            <tr>
              <td></td>
              <td>
                <strong>{ele}</strong>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>{suggestionDesc ? suggestionDesc[index] : ""}</td>
            </tr>
          </>
        ));
      }
    } catch (e) {
      console.log(e);
    }
    return "";
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-print">
          <div className="col-lg-12 details" ref={componentRef}>
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
            <div className="d-flex justify-content-between print-form">
              <div className="bg-logo head">
                <img
                  src={sannathan}
                  alt="My Image"
                  className="my-image-print"
                />
              </div>
              <div>{/* <h5 className="reg">Reg.slip</h5> */}</div>
              <div>
                {/* <h4 className="reg-head">SANNATHAN JEEVAN TRUST</h4> */}
                <div className="sana-print">SANNATHAN JEEVAN TRUST</div>
                <div>ILTD Colony, AR Nagar, Chirala.</div>
                {/* <div> Chirala 523157</div> */}
                {/* <div>example@example.com</div>
  <div>www.example.com</div> */}
                <div>PH : 083339 37666</div>
              </div>
            </div>

            <Table striped="columns">
              <tbody>
                {keysToDisplay.map(({ label, key }) => (
                  <tr key={key}>
                    <td>{label}</td>
                    <td>
                      {key === "prescription" ||
                      key === "usage" ||
                      key === "suggestion" ||
                      key === "suggestionDesc" ||
                      key === "diagnosisName" ? (
                        medicalRecords.length === 0 ? (
                          // Print patientData[key] if medicalRecords are empty
                          patientData[key]
                        ) : (
                          <div>
                            {medicalRecords.map((record, index) => (
                              <div key={index}>
                                {key === "prescription" && (
                                  <div>
                                    {innerPrescription(
                                      record,
                                      "prescription",
                                      "usage"
                                    )}

                                    {/* <strong>{record.prescription}</strong> */}
                                  </div>
                                )}
                                {/* {key === "usage" && <div>{record.usage}</div>} */}
                                {key === "suggestion" && (
                                  <div>
                                    {innerSuggestion(
                                      record,
                                      "suggestion",
                                      "description"
                                    )}
                                    {/* <strong>{record.suggestion}</strong> */}
                                  </div>
                                )}
                                {/* {key === "suggestionDesc" && (
                                        <div>{record.description}</div>
                                      )} */}
                                {key === "diagnosisName" && (
                                  <div>{record.diagnosis}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        )
                      ) : (
                        patientData[key]
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePrint}>Print</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Print;
