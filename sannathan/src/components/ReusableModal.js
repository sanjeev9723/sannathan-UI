import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


import styled from 'styled-components'



function StyledModal  (props)  {
    const {  title,buttonComponent } = props;

    return (
        <Modal
        {...props}
        size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        // dialogClassName="full-page-modal"
      >
        {/* Modal content */}
        <Modal.Header>
          <Modal.Title className="text-center">
            {" "}
            <h3 >{title}</h3>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
        {buttonComponent && (
          <div className="text-center">
            {buttonComponent}
          </div>
        )}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default StyledModal;