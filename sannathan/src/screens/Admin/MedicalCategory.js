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

function MedicalCategory() {
  const axiosInst = useAxiosPost();

  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };

  //   const [email, setEmail] = useState("");
  // const currentList = [
  //   { label: "Carrot", value: "carrot", isChecked: false },
  //   { label: "Potato", value: "potato", isChecked: false },
  //   { label: "Tomato", value: "tomato", isChecked: false },
  //   { label: "Lettuce", value: "lettuce", isChecked: false },
  //   { label: "Cucumber", value: "cucumber", isChecked: false },
  //   { label: "Broccoli", value: "broccoli", isChecked: false },
  //   { label: "Spinach", value: "spinach", isChecked: false },
  //   { label: "Onion", value: "onion", isChecked: false },
  //   { label: "Pepper", value: "pepper", isChecked: false },
  //   { label: "Radish", value: "radish", isChecked: false },
  // ];
  const [searchTerm, setSearchTerm] = useState("");
  const [current, setCurrent] = useState([]);
  const [newItem, setNewItem] = useState({
    label: "",
    value: "",
    isChecked: false,
  });
  let rowNumber = 1;

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      try {
        const response = await axiosInst.get("/master/medicalcategory");
        if (Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((item) => ({
            label: item.medicalCategoryName,
            value: item.medicalCategoryId,
            // isChecked: false,
          }));

          setCurrent(formattedData);
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

  const handleAddItem = (event) => {
    event.preventDefault();
    const updatedCurrent = [...current, newItem];
    setCurrent(updatedCurrent);
    setNewItem({ label: "", value: "", isChecked: false });

    localStorage.setItem("currentList", JSON.stringify(updatedCurrent));
  };

  const handleDeleteItem = (value) => {
    const updatedCurrent = current.filter((item) => item.value !== value);
    setCurrent(updatedCurrent);

    localStorage.setItem("currentList", JSON.stringify(updatedCurrent));
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const filteredCurrent = current.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   const storedCurrentList = localStorage.getItem("currentList");
  //   if (storedCurrentList) {
  //     setCurrent(JSON.parse(storedCurrentList));
  //   }
  // }, []);

  // const handleUpdateItem = (value) => {
  //   const updatedPreferences = preferences.map((item) => {
  //     if (item.value === value) {
  //       return { ...item, isChecked: !item.isChecked };
  //     }
  //     return item;
  //   });
  //   setPreferences(updatedPreferences);
  // };

  return (
    <div style={{ overflow: "auto" }}>
      <HeaderMenu />
      <div className="dash-content">
      <AdminNavbar />

      <div className="container">
        <div className="row mt-4">
          <div className="col-md-4 col-lg-6 div_border ">
            <div>
              <h3 className="text-center patient-id">Medical Category List</h3>
              {/* <div className="search-box">
                <SearchBar onSearch={handleSearch} />
              </div> */}
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCurrent.map((item) => (
                      <tr key={item.value}>
                        <td className="fw-bold">{rowNumber++}</td>
                        <td>{item.label}</td>
                        <td>
                          <FaTrash
                          // onClick={() => handleDeleteItem(item.value)}
                          />
                          {/* <button onClick={() => handleUpdateItem(item.value)}>
              Toggle Check
            </button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-5 ">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <form className="form">
                    <h5 className="text-center patient-id">Medical Category</h5>
                    {/* <p className="text-muted forgot">
                      Enter your registered email address.
                    </p> */}
                    <div className="panel-body">
                      <div className="form-group">
                        <div className="mb-3 input-group">
                          <input
                            type="text"
                            name="label"
                            placeholder="Code ID"
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
                            placeholder=" Name"
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
    </div>
  );
}

export default MedicalCategory;
