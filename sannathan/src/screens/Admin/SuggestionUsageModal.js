import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function SuggestionUsageModal({
  show,
  onHide,
  suggestionData,
}) {

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Suggestion Usage</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {suggestionData.map((suggestion) => (
          <div key={suggestion.suggestionCode}>
            <p>Code: {suggestion.suggestionCode}</p>
            <p>Description: {suggestion.suggestionDesc}</p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        {/* Add a Save button or any other actions if needed */}
      </Modal.Footer>
    </Modal>
  );
}

export default SuggestionUsageModal;
