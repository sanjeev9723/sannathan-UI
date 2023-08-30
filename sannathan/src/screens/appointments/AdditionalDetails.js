import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputSearch from "../../components/InputSearch";
import Select from "../../components/Select.js";
import { addNewOrder } from "../../redux/reducer/AppointmentReducer";
import { useReactToPrint } from "react-to-print";
import InputModal from "./InputModal";
import InputControl from "../../components/InputControl";
import { useNavigate } from "react-router-dom";

function CenteredModal(props) {
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  const [val, setVal] = useState("");
  const componentRef = React.useRef(null);
  const [addShow, setAddShow] = useState(false);
  const [preferenceValue, setPreferenceValue] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  // const [checkboxValues, setCheckboxValues] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [productsList, setProductsList] = useState(["Select Options..."]);
  const [preferenceValues, setPreferenceValues] = useState([
    "Select Options...",
  ]);
  const [currentValues, setCurrentValues] = useState(["Select Options..."]);
  const [originalValues, setOriginalValues] = useState(["Select Options..."]);
  const [diagnosisValues, setDiagnosisValues] = useState(["Select Options..."]);
  const [freeMedicineValues, setFreeMedicineValues] = useState([
    "Select Options...",
  ]);
  const [suggestionValues, setSuggestionValues] = useState([
    "Select Options...",
  ]);
  const [diseaseStatusValues, setDiseaseStatusValues] = useState([
    "Select Options...",
  ]);

  const preferenceList = [
    { label: "Shirt", value: "shirt", isChecked: false },
    { label: "Pants", value: "pants", isChecked: false },
    { label: "Dress", value: "dress", isChecked: false },
    { label: "Shoes", value: "shoes", isChecked: false },
    { label: "Hat", value: "hat", isChecked: false },
    { label: "Socks", value: "socks", isChecked: false },
    { label: "Jacket", value: "jacket", isChecked: false },
    { label: "Skirt", value: "skirt", isChecked: false },
    { label: "Tie", value: "tie", isChecked: false },
    { label: "Gloves", value: "gloves", isChecked: false },
  ];
  const currentList = [
    { label: "Carrot", value: "carrot", isChecked: false },
    { label: "Potato", value: "potato", isChecked: false },
    { label: "Tomato", value: "tomato", isChecked: false },
    { label: "Lettuce", value: "lettuce", isChecked: false },
    { label: "Cucumber", value: "cucumber", isChecked: false },
    { label: "Broccoli", value: "broccoli", isChecked: false },
    { label: "Spinach", value: "spinach", isChecked: false },
    { label: "Onion", value: "onion", isChecked: false },
    { label: "Pepper", value: "pepper", isChecked: false },
    { label: "Radish", value: "radish", isChecked: false },
  ];
  const originalMedicalCategory = [
    { label: "Chicken", value: "chicken", isChecked: false },
    { label: "Beef", value: "beef", isChecked: false },
    { label: "Pork", value: "pork", isChecked: false },
    { label: "Fish", value: "fish", isChecked: false },
    { label: "Shrimp", value: "shrimp", isChecked: false },
    { label: "Lamb", value: "lamb", isChecked: false },
    { label: "Turkey", value: "turkey", isChecked: false },
    { label: "Salmon", value: "salmon", isChecked: false },
    { label: "Tuna", value: "tuna", isChecked: false },
    { label: "Crab", value: "crab", isChecked: false },
  ];
  const diagnosis = [
    { label: "Blue", value: "blue", isChecked: false },
    { label: "Red", value: "red", isChecked: false },
    { label: "Green", value: "green", isChecked: false },
    { label: "Yellow", value: "yellow", isChecked: false },
    { label: "Purple", value: "purple", isChecked: false },
    { label: "Orange", value: "orange", isChecked: false },
    { label: "Pink", value: "pink", isChecked: false },
    { label: "Brown", value: "brown", isChecked: false },
    { label: "Black", value: "black", isChecked: false },
    { label: "White", value: "white", isChecked: false },
  ];

  const freeMedicine = [
    { label: "Car", value: "car", isChecked: false },
    { label: "Bicycle", value: "bicycle", isChecked: false },
    { label: "Motorcycle", value: "motorcycle", isChecked: false },
    { label: "Bus", value: "bus", isChecked: false },
    { label: "Truck", value: "truck", isChecked: false },
    { label: "Train", value: "train", isChecked: false },
    { label: "Boat", value: "boat", isChecked: false },
    { label: "Airplane", value: "airplane", isChecked: false },
    { label: "Helicopter", value: "helicopter", isChecked: false },
    { label: "Scooter", value: "scooter", isChecked: false },
  ];

  const diseaseStatus = [
    { label: "Football", value: "football", isChecked: false },
    { label: "Basketball", value: "basketball", isChecked: false },
    { label: "Baseball", value: "baseball", isChecked: false },
    { label: "Soccer", value: "soccer", isChecked: false },
    { label: "Tennis", value: "tennis", isChecked: false },
    { label: "Golf", value: "golf", isChecked: false },
    { label: "Volleyball", value: "volleyball", isChecked: false },
    { label: "Hockey", value: "hockey", isChecked: false },
    { label: "Cricket", value: "cricket", isChecked: false },
    { label: "Rugby", value: "rugby", isChecked: false },
  ];

  const suggestion = [
    { label: "Book", value: "book", isChecked: false },
    { label: "Pen", value: "pen", isChecked: false },
    { label: "Pencil", value: "pencil", isChecked: false },
    { label: "Notebook", value: "notebook", isChecked: false },
    { label: "Eraser", value: "eraser", isChecked: false },
    { label: "Marker", value: "marker", isChecked: false },
    { label: "Scissors", value: "scissors", isChecked: false },
    { label: "Ruler", value: "ruler", isChecked: false },
    { label: "Glue", value: "glue", isChecked: false },
    { label: "Calculator", value: "calculator", isChecked: false },
  ];

  // const onClick = () => setAddShow(true);

  const onSelectModal = (list) => {
    setAddShow(true);
    setProductsList(list);
  };

  const onDeSelectModal = () => {
    setAddShow(false);
    setProductsList([]);
  };

  const handleSelect = (values) => {
    const preferenceSelectedValues = values.filter((value) =>
      preferenceList.some((item) => item.label === value)
    );
    if (preferenceSelectedValues.length > 0) {
      setPreferenceValues(preferenceSelectedValues);
    }

    const currentSelectedValues = values.filter((value) =>
      currentList.some((item) => item.label === value)
    );
    if (currentSelectedValues.length > 0) {
      setCurrentValues(currentSelectedValues);
    }

    const originalSelectedValues = values.filter((value) =>
      originalMedicalCategory.some((item) => item.label === value)
    );
    if (originalSelectedValues.length > 0) {
      setOriginalValues(originalSelectedValues);
    }

    const diagnosisSelectedValues = values.filter((value) =>
      diagnosis.some((item) => item.label === value)
    );
    if (diagnosisSelectedValues.length > 0) {
      setDiagnosisValues(diagnosisSelectedValues);
    }

    const freeMedicineSelectedValues = values.filter((value) =>
      freeMedicine.some((item) => item.label === value)
    );
    if (freeMedicineSelectedValues.length > 0) {
      setFreeMedicineValues(freeMedicineSelectedValues);
    }

    const suggestionSelectedValues = values.filter((value) =>
      suggestion.some((item) => item.label === value)
    );
    if (suggestionSelectedValues.length > 0) {
      setSuggestionValues(suggestionSelectedValues);
    }

    const diseaseStatusSelectedValues = values.filter((value) =>
      diseaseStatus.some((item) => item.label === value)
    );
    if (diseaseStatusSelectedValues.length > 0) {
      setDiseaseStatusValues(diseaseStatusSelectedValues);
    }
  };

  const toggleIsChecked = (i, checked) => {
    setProductsList((prevList) => {
      const updatedList = [...prevList];
      updatedList[i].isChecked = checked;
      return updatedList;
    });

    updateSearchInput();
  };

  const toggleSelectAll = (checked) => {
    setSelectAll(checked);

    setProductsList((prevList) =>
      prevList.map((product) => ({
        ...product,
        isChecked: checked,
      }))
    );

    updateSearchInput();
  };

  const updateSearchInput = () => {
    const selectedProducts = productsList
      .filter((product) => product.isChecked)
      .map((product) => product.label);

    setSelectedValues(selectedProducts); // Update selectedValues state

    if (selectedProducts.length > 0) {
      setVal(selectedProducts.join(", "));
    } else {
      setVal("");
    }
  };
  const onSave = (e) => {
    e.preventDefault();
    handleSelect(selectedValues);
    setAddShow(false);
  };

  useEffect(() => {
    updateSearchInput();
  }, [productsList]);

  // const reactToPrintContent = React.useCallback(() => {
  //   return componentRef.current;
  // });
  // const handlePrint = useReactToPrint({
  //   content: reactToPrintContent,
  //   documentTitle: "print doc",
  //   removeAfterPrint: true,
  // });
  const onClick = () => setAddShow(true);

  return (
    <div className="container overflow-auto">
      <div className=" box-toggle2">
        <div className=" shadow-md add">
          <form className="form-group my-5 " method="post" action="#">
            <InputModal
              show={addShow}
              onHide={() => setAddShow(false)}
              onSave={onSave}
            >
              <div className="modal-height">
                <div className="main-login main-center">
                  <div className="modal-flex">
                    <button
                      type="button"
                      className="modal-header btn-close"
                      aria-label="Close"
                      // onClick={props.onHide}
                    ></button>
                    <input
                      label="select"
                      type="search"
                      className="modal-search"
                      id="mySearch"
                      name="q"
                      placeholder="Search"
                      aria-label="Search through site content"
                      value={val}
                      onChange={(e) => setVal(e.target.value)}
                    />
                  </div>
                  <div className="table-container">
                    <table className="table">
                      <div className="px-2 modal-search-box">
                        <label>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={(e) => toggleSelectAll(e.target.checked)}
                          />
                          Select All
                        </label>
                      </div>

                      <tbody>
                        {Array(Math.ceil(productsList.length / 5))
                          .fill()
                          .map((_, rowIndex) => (
                            <tr key={rowIndex}>
                              {productsList
                                .slice(rowIndex * 5, rowIndex * 5 + 5)
                                .map((product, colIndex) => (
                                  <td key={colIndex}>
                                    <input
                                      type="checkbox"
                                      name={`option${product.value}`}
                                      checked={product.isChecked}
                                      onChange={(event) =>
                                        toggleIsChecked(
                                          rowIndex * 5 + colIndex,
                                          event.target.checked
                                        )
                                      }
                                    />
                                    {product.label}
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
            <div className="col-12">
              <InputSearch
                label={"PREFERENCE"}
                placeholder={preferenceValues}
                value={preferenceValues}
                onClick={() => onSelectModal(preferenceList)}
              />
            </div>
            <div className="col-12">
              <InputSearch
                label={"CURRENT MEDICAL CATEGORY"}
                placeholder={currentValues}
                value={currentValues}
                onClick={() => onSelectModal(currentList)}
              />
            </div>
            <div className="col-12">
              <InputSearch
                label={"ORIGINAL MEDICAL CATEGORY"}
                placeholder={originalValues}
                value={originalValues}
                onClick={() => onSelectModal(originalMedicalCategory)}
              />
            </div>
            <div className="col-12">
              <InputSearch
                label={"DIAGNOSIS"}
                placeholder={diagnosisValues}
                value={diagnosisValues}
                onClick={() => onSelectModal(diagnosis)}
              />
            </div>
            <div className="col-12">
              <InputSearch
                label={"FREE MEDICINE"}
                placeholder={freeMedicineValues}
                value={freeMedicineValues}
                onClick={() => onSelectModal(freeMedicine)}
              />
            </div>
            <div className="col-12">
              <InputSearch
                label={"SUGGESTION"}
                placeholder={suggestionValues}
                value={suggestionValues}
                onClick={() => onSelectModal(suggestion)}
              />
            </div>
            <div className="col-12">
              <InputSearch
                label={"DISEASE STATUS"}
                placeholder={diseaseStatusValues}
                value={diseaseStatusValues}
                onClick={() => onSelectModal(diseaseStatus)}
              />
            </div>
            <div className="d-flex flex-row-reverse add">
              <button type="button" className="btn btn-primary rounded">
                Save
              </button>

              <div className="back">
                <button
                  type="button"
                  className="btn btn-primary rounded"
                  onClick={() => {
                    gotoPage("appointments");
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CenteredModal;
