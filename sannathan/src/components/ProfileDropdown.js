import React, { useState, useEffect, useRef } from 'react';
import profile from "../screens/images/profile.png"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/authenticationReducer";
import 'font-awesome/css/font-awesome.min.css';


function ProfileDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gotoPage = (page) => {
    navigate(`/${page}`);
  };
  const userRole = useSelector(({authentication})=>{
    return authentication.userRole
  })
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSettingClick = () => {
    // Implement logic to navigate to the user's dashboard
  };

  const handleProfileClick = () => {
    // Implement logic to navigate to the user's profile page
  };

  const handleLogoutClick = () => {
    // Clear the "Remember Me" flag from localStorage
    localStorage.removeItem("rememberMe");
    
    // Dispatch an action to clear the userRole from the Redux store
    dispatch(loginSuccess(null));

    // Navigate the user to the login page
    gotoPage("login");
  };
  

  // Replace with the user's name
 
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      {/* <button className="profile-dropdown__button" onClick={toggleDropdown}> */}
      <button className="btn dropdown-toggle btn_icons"onClick={toggleDropdown} type="button" id="dropdownMenu5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

      <i className="fa fa-user-circle " aria-hidden="true"></i>
        {/* <img src={profile} alt="Language" className="profile-icon"/> */}
        <span className="profile-dropdown__name me-2">{userRole}</span>
      </button>
      {isOpen && (
        <ul className="profile-dropdown__menu">
          <li onClick={handleProfileClick}>Profile</li>
          <div className="dropdown-divider"></div>
          <li onClick={handleSettingClick}>Setting</li>
          <div className="dropdown-divider"></div>
          <li onClick={handleLogoutClick}>Logout</li>
        </ul>
      )}
    </div>
  );
}

export default ProfileDropdown;
