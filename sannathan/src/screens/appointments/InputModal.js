import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputSearch from "../../components/InputSearch";
import Select from "../../components/Select.js";
import { addNewOrder } from "../../redux/reducer/AppointmentReducer";
import { useReactToPrint } from "react-to-print";

function InputModal(props) {
  const { onSave, title } = props;

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
          <Modal.Title className="text-center">
            {" "}
            <h3 >{title}</h3>{" "}
          </Modal.Title>
          {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
														  <span aria-hidden="true">×</span>
														</button> */}
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
