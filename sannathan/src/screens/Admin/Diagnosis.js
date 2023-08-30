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

function Diagnosis() {
  const axiosInst = useAxiosPost();
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };


  const [searchTerm, setSearchTerm] = useState("");
  const [diagnosis, setDiagnosis] = useState([]);
  const [newItem, setNewItem] = useState({
    label: "",
    value: "",
    isChecked: false,
  });

  // const [initialDiagnosis, setInitialDiagnosis] = useState([]);  // Initialize with an empty array

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      try {
        const response = await axiosInst.get("/master/diagnosis");
        if ( Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((item) => ({
            label: item.diagnosisName, // Make sure this property matches the API response
            value: item.diagnosisId,   // You can add other properties here if needed
            // isChecked: false,
          }));
          
          setDiagnosis(formattedData);
          // localStorage.setItem(
          //   "diagnosisList",
          //   JSON.stringify(formattedData)
          // );
          console.log(formattedData);
        } else {
          console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching diagnosis data:", error);
      }
    };

    fetchDiagnosisData();
  }, []);

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = (e) => {
    e.preventDefault(); 
    const updatedDiagnosis = [...diagnosis, newItem];
    setDiagnosis(updatedDiagnosis);
    setNewItem({ label: "", value: "", isChecked: false });

    localStorage.setItem("diagnosisList", JSON.stringify(updatedDiagnosis));
  };

  const handleDeleteItem = (value) => {
    const updatedDiagnosis = diagnosis.filter((item) => item.value !== value);
    setDiagnosis(updatedDiagnosis);

    localStorage.setItem("diagnosisList", JSON.stringify(updatedDiagnosis));
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredDiagnosis = diagnosis.filter((item) =>
  item.label.toLowerCase().includes(searchTerm.toLowerCase())
);


  // useEffect(() => {
  //   const storedDiagnosisList = localStorage.getItem("diagnosisList");
  //   if (storedDiagnosisList) {
  //     setDiagnosis(JSON.parse(storedDiagnosisList));
  //   }
  // }, []);

  return (
    <div style={{ overflow: "auto" }}>
      <HeaderMenu />
      <AdminNavbar />
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-6">
            <div>
              <h5 className="text-center patient-id">Diagnosis List</h5>
              <div className="search-box">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div style={{ maxHeight: "450px", overflow: "auto" }}>
                <Table>
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDiagnosis.map((item) => (
                      <tr key={item.value}>
                        <td>{item.label}</td>
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
          <div className="col-md-4 col-lg-6">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <form className="form">
                    <h5 className="text-center patient-id">Add Diagnosis</h5>
                    <div className="panel-body">
                      <div className="form-group">
                        <div className="mb-3 input-group">
                          <input
                            type="text"
                            name="label"
                            placeholder="Diagnosis Label"
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
                            placeholder="Diagnosis Value"
                            className="form-control"
                            value={newItem.value}
                            onChange={handleInputChange}
                            style={{ backgroundColor: "white" }}
                          />
                        </div>
                      </div>
                      <div className="form-group forgot-submit">
                        <button
                          className="btn btn-primary rounded w-100 theme-btn mx-auto"
                          type="submit"
                          onClick={handleAddItem}
                        >
                          Add
                        </button>
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

export default Diagnosis;
