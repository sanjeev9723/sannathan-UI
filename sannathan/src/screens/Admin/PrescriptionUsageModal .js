import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function PrescriptionUsageModal({
  show,
  onHide,
  // prescriptionTitle,
  // prescriptionUsage,
  prescriptionData,
  
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Prescription Usage</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {prescriptionData.map((prescription) => (
          <div key={prescription.prescriptionCode}>
            <p>Title: {prescription.prescriptionCode}</p>
            <p>Usage: {prescription.usage}</p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        {/* <Button onClick={onHide}>save</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default PrescriptionUsageModal;
