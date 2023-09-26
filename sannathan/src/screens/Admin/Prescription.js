import React, { useState, useEffect } from "react";
import InputControl from "../../components/InputControl";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import AdminNavbar from "../../components/AdminNavbar";
import Table from "react-bootstrap/Table";
import SearchBar from "../../components/Search";
import HeaderMenu from "../../components/HeaderMenu";
import { FaTrash } from "react-icons/fa";
import useAxiosPost from "../../api/useAxiosPost";

function Prescription() {
  const axiosInst = useAxiosPost();
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [prescription, setPrescription] = useState([]);
  const [newItem, setNewItem] = useState({
    label: "",
    value: "",
    isChecked: false,
  });
  let rowNumber = 1;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInst.get("/master/prescription");

        console.log("API Response:", response.data);

        if (Array.isArray(response.data.data)) {
          // Format the fetched data and set the prescription state
          const formattedData = response.data.data.map((item) => ({
            label: item.prescriptionTitle,
            value: item.prescriptionCode,
            usage: item.usage,
            use: item.use,

            // isChecked: false,
          }));
          setPrescription(formattedData);
          // localStorage.setItem(
          //   "prescriptionList",
          //   JSON.stringify(formattedData)
          // );
        } else {
          console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Current prescription state:", prescription);

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const updatedPrescription = [...prescription, newItem];
    setPrescription(updatedPrescription);
    setNewItem({ label: "", value: "", isChecked: false });

    localStorage.setItem(
      "prescriptionList",
      JSON.stringify(updatedPrescription)
    );
  };

  const handleDeleteItem = (value) => {
    const updatedPrescription = prescription.filter(
      (item) => item.value !== value
    );
    setPrescription(updatedPrescription);

    localStorage.setItem(
      "prescriptionList",
      JSON.stringify(updatedPrescription)
    );
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredPrescription = prescription.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   const storedPrescriptionList = localStorage.getItem("prescriptionList");
  //   if (storedPrescriptionList) {
  //     setPrescription(JSON.parse(storedPrescriptionList));
  //   }
  // }, []);

  return (
    <div style={{ overflow: "auto" }}>
      <HeaderMenu />

      <div className="dash-content">
        <AdminNavbar />
        <div className="row  mt-4 ">
          <div className="col-md-4 col-lg-7 div_border">
            <div className="">
              <h3 className="text-center patient-id">Prescription </h3>
              <div class="mt-2 form-group has-search mb-3">
                <span class="fa fa-search form-control-feedback"></span>
                <SearchBar onSearch={handleSearch} />

              </div>
              <div style={{ maxHeight: "450px", overflow: "auto" }}>
                <Table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Label</th>
                      <th>Usage</th>
                      <th>Use</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrescription.map((item) => (
                      <tr key={item.label}>
                        <td className="fw-bold">{rowNumber++}</td>
                        <td>{item.label}</td>
                        <td>{item.usage}</td>{" "}
                        {/* Display the "usage" information */}
                        <td>{item.use}</td>{" "}
                        {/* Display the "usage" information */}
                        <td>
                          <FaTrash
                          // onClick={() => handleDeleteItem(item.value)}
                          />{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-5">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <form className="form">
                    <h3 className="text-center patient-id">Add Prescription</h3>
                    <div className="panel-body">
                      <div className="form-group">
                        <div className="mb-3 input-group">
                          <input
                            type="text"
                            name="label"
                            placeholder="Prescription Label"
                            className="form-control"
                            value={newItem.label}
                            onChange={handleInputChange}
                            style={{ backgroundColor: "white" }}
                          />
                        </div>
                        <div className="mb-3 input-group">
                          <input
                            type="text"
                            name="value"
                            placeholder="Prescription Value"
                            className="form-control"
                            value={newItem.value}
                            onChange={handleInputChange}
                            style={{ backgroundColor: "white" }}
                          />
                        </div>
                      </div>
                      <div class="form-row">
                      <div class="form-group col-md-3  float-end mb-1">
                          <button
                            type="button"
                            class="btn btn_save search_width"
                            onClick={handleAddItem}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <input
                        type="hidden"
                        className="hide"
                        name="token"
                        id="token"
                        value=""
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
