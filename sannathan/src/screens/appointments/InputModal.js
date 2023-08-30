import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputSearch from "../../components/InputSearch";
import Select from "../../components/Select.js";
import { addNewOrder } from "../../redux/reducer/AppointmentReducer";
import { useReactToPrint } from "react-to-print";

function InputModal(props) {
  const { onSave } = props;

  // const [productsList, setProductsList] = useState(defaultProductList);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        // dialogClassName="full-page-modal" 
        

      >
        {/* Modal content */}
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={onSave}>save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InputModal;
