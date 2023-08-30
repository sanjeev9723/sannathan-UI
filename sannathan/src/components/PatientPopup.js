import React from "react";

function PatientDetailsPopup({ patientData, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Patient Details</h2>
        {/* <p>Name: {patientData[0].patientName}</p>
        <p>Age: {patientData[0].age}</p> */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PatientDetailsPopup;
