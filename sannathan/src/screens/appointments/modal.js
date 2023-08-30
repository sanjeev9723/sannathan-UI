import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import sannathan from "../images/sannathan.png";

function MyVerticallyCenteredModal(props) {
  const { data} = props; // Destructure props

  // console.log(data);
  const componentRef = useRef(null);

  const keysToDisplay = [
    { label: "Date", key: "appointmentDate" },
    { label: "Patient ID", key: "message" },
    { label: " ID", key: "id" },
    { label: "Patient Name", key: "name" },
    { label: "Slot", key: "slot" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "Contact Number", key: "phoneNumber" },
    { label: "Address", key: "city" },
    { label: "Status", key: "status" },
    { label: "Email", key: "email" },
    { label: "Food", key: "reqFoodFor" },
    { label: "Prescription", key: "prescription" },
    // { label: "Mode", key: "mode" },
    // { label: "Total Patients", key: "totalPatients" },

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

  const keys = Object.keys(props?.data);
  const { TokenNumber } = props?.data; // Extract the TokenNumber from the data object

  // Remove the unnecessary fields from the keys array
  const filteredKeys = keys.filter(
    (key) =>
      key !== "TokenNumber" &&
      key !== "Mobile Number" &&
      key !== "Whatsapp Number" &&
      key !== "Prescription"
  );

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
                  margin: 0cm 1cm ;
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
              <div>
                {/* <h5 className="reg">Reg.slip</h5> */}
              </div>
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
                    <td>{data[key]}</td>
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

export default MyVerticallyCenteredModal;
