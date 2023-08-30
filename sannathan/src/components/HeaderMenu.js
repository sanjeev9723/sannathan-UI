// import { useLocation, useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import leafHeader from "../screens/images/leaf-header.png";
import SideNavUser  from "../screens/Navbar/SideNavUser ";
import SideNavAdmin from "../screens/Navbar/SideNavAdmin";
import { useSelector } from "react-redux";
const HeaderMenu = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
  // const gotoPage = (page)=>{
  //     navigate(`/${page}`)
  // }
  const userRole = useSelector(({authentication})=>{
    return authentication.userRole
  })
  
  return (
    <>
      <nav className="py-2 border-bottom">
        <div className="d-flex">
        {userRole === 'Admin' ? <SideNavAdmin /> : <SideNavUser />}
          <div>
          </div>
          <div className="offset-xs-2 offset-sm-6   offset-md-4 offset-lg-8 offset-xl-9 d-flex align-items-center ">
            <div className=" px-2 header-right">
              <LanguageSelector />
            </div>
            <div className=" px-1 header-left">
              <NotificationDropdown />
            </div>
            <div className="ms-4 header-profile">
              <ProfileDropdown />
            </div>
          </div>
          {/* <ul className="nav me-auto">
            <li className="nav-item"><a  className="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
          </ul> */}
          {/* <ul className="nav">
                       {location.pathname =='/login' ? "": 
                        <li className="nav-item"><a onClick={()=>{gotoPage('login')}} className="nav-link link-light px-2">Log out</a></li> }
                        {location.pathname =='/appointments' ? "": 
                        <li className="nav-item"><a onClick={()=>{gotoPage('register')}} className="nav-link link-light px-2">Sign up</a></li> }
                    </ul> */}
        </div>
      </nav>
      {/* <header className="py-3 mb-4 border-bottom">
                <div className="container d-flex flex-wrap justify-content-center">
                    <a className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                        <p style={{ "textAlign": "center" }}>
                            <a href="" className="navbar-brand" >
                                <span style={{ fontSize: "30px", color: "green" }}>
                                    <b>SANAATHAN JEEVAN</b></span><br />
                                <span style={{ "fontSize": "12px" }}>Ancient Ways of Life</span>
                            </a>
                        </p>
                    </a>
                    <form className="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
                        <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                        <button type="button" className="btn btn-primary rounded mt-10" onClick={()=>{gotoPage('appointments')}} >Book Appointment</button>
                    </form>
                </div>
            </header> */}
    </>
  );
};
export default HeaderMenu;
