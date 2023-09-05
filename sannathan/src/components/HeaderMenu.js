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
    {/* <header class="dash-toolbar">
					<a href="#" class="img_dashboard"><img class="" src="images/logo_dashboard.png" alt="Sanaathan Jeevan"/></a>
					<a href="#!" class="menu-toggle">
						<i class="fa fa-bars" aria-hidden="true"></i>
					</a>
					<div class="tools">

						<div class="dropdown open">
						<button class="btn dropdown-toggle btn_icons" type="button" id="dropdownMenu5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fa fa-language" aria-hidden="true"></i>
						</button>
						<div class="dropdown-menu dropdown-menu-right">
							<a class="dropdown-item" href="#!">English</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#!">Telugu</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#!">Hindi</a>
						</div>
						</div>

						<button href="#!" class="btn tools-item btn_icons">
							<i class="fa fa-bell-o" aria-hidden="true"></i>
							<i class="tools-item-count">4</i>
						</button>

						<div class="dropdown open">
						<button class="btn dropdown-toggle btn_icons" type="button" id="dropdownMenu5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fa fa-user-circle" aria-hidden="true"></i>
						</button>
						<div class="dropdown-menu dropdown-menu-right">
							<a class="dropdown-item" href="#!">Profile</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#!">Setting</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#!">Logout</a>
						</div>
						</div>
					</div>
				</header> */}
      <nav className="dash-toolbar">
      {userRole === 'Admin' ? <SideNavAdmin /> : <SideNavUser />}

        <div className="tools">
         
            <div className="header-right">
              <LanguageSelector />
            </div>
            <div className="  header-left">
              <NotificationDropdown />
            </div>
            <div className=" header-profile">
              <ProfileDropdown />
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
