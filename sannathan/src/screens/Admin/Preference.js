import React, { useState, useEffect } from "react";
import InputControl from "../../components/InputControl";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import AdminNavbar from "../../components/AdminNavbar";
import Table from "react-bootstrap/Table";
import SearchBar from "../../components/Search";
import HeaderMenu from "../../components/HeaderMenu";
import { FaTrash } from "react-icons/fa";

function Preference() {
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };
  let rowNumber = 1;
  //   const [email, setEmail] = useState("");
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
  const [searchTerm, setSearchTerm] = useState("");
  const [preferences, setPreferences] = useState(preferenceList);
  const [newItem, setNewItem] = useState({
    label: "",
    value: "",
    isChecked: false,
  });

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    const updatedPreferences = [...preferences, newItem];
    setPreferences(updatedPreferences);
    setNewItem({ label: "", value: "", isChecked: false });

    localStorage.setItem("preferenceList", JSON.stringify(updatedPreferences));
  };

  const handleDeleteItem = (value) => {
    const updatedPreferences = preferences.filter(
      (item) => item.value !== value
    );
    setPreferences(updatedPreferences);

    localStorage.setItem("preferenceList", JSON.stringify(updatedPreferences));
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const filteredPreferences = preferences.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const storedPreferenceList = localStorage.getItem("preferenceList");
    if (storedPreferenceList) {
      setPreferences(JSON.parse(storedPreferenceList));
    }
  }, []);

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

      <div className="dash-content ">
      <AdminNavbar />

        <div className="container ">
          <div className="">
          </div>
          <div>
            <div className=" row mt-4">
              <div className="col-md-4 col-lg-6 div_border">
                <div>
                  <h3 class="text-center ">Preference List</h3>{" "}
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
                        {filteredPreferences.map((item) => (
                          <tr key={item.value}>
                            <td className="fw-bold">{rowNumber++}</td>
                            <td>{item.label}</td>
                            <td>
                              <FaTrash
                                onClick={() => handleDeleteItem(item.value)}
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
              <div className="col-md-4 col-lg-6 ">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="text-center">
                      <form className="form">
                        <h3 className="text-center patient-id">Preference</h3>
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
                          {/* <div className="form-group forgot-submit">
                        <button
                          className="btn btn-primary rounded w-100 theme-btn mx-auto"
                          type="submit"
                          onClick={handleAddItem}
                        >
                          save
                        </button>
                      </div> */}
                          <div class="form-row">
                            <div class="form-group col-md-2 offset-md-10 mb-1">
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
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preference;
