import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { Container } from "react-bootstrap";
import Footer from './components/Footer';
import HeaderMenu from './components/HeaderMenu';
import { Route, Routes } from "react-router-dom";
import Appointments from './screens/appointments';
import Login from './screens/login';
import Register from './screens/register';
import CenteredModal from './screens/appointments/AdditionalDetails';
import ForgotPassword from './screens/forgot';
import ChangePassword from './screens/password';
import AdminProfile from './screens/AdminProfile/AdminProfile';
import AdminPage from './screens/Admin';
import MedicalCategory from './screens/Admin/MedicalCategory';
import Diagnosis from './screens/Admin/Diagnosis';
import Prescription from './screens/Admin/Prescription';
import Suggestion from './screens/Admin/Suggestion';
import Preference from './screens/Admin/Preference';
import PdfSamplePage from './components/PdfSample';
import Bookings from './screens/appointments/Appointments';
import Report from './screens/Report/Report';
import AppointmentReport from './screens/Report/AppointmentReport';
import AdminAcess from './screens/AdminProfile';
import Client from './api/client';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
function App() {

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Client />
      <div className="ol-BasePage">
      
        <Routes>
          <Route  path={"/"} element={<Login />} />
          <Route  path={"/login"} element={<Login />} />
          <Route exact path={"/register"} element={<Register />} />
          <Route exact path={"/appointments"} element={<Appointments />} />
          <Route exact path={"/centeredmodal"} element={<CenteredModal />} />
          <Route exact path={"/forgotpassword"} element={<ForgotPassword />} />
          <Route exact path={"/changepassword"} element={<ChangePassword />} />
          <Route exact path={"/adminprofile"} element={<AdminProfile />} />
          <Route exact path={"/adminpage"} element={<AdminPage/>} />
          <Route exact path={"/adminacess"} element={<AdminAcess/>} />
          <Route exact path={"/medicalcategory"} element={<MedicalCategory/>} />
          <Route exact path={"/diagnosis"} element={<Diagnosis/>} />
          <Route exact path={"/prescription"} element={<Prescription/>} />
          <Route exact path={"/suggestion"} element={<Suggestion/>} />
          <Route exact path={"/preference"} element={<Preference/>} />
          <Route exact path={"/pdf-sample"} element={<PdfSamplePage/>} />
          <Route exact path={"/bookings"} element={<Bookings/>} />
          <Route exact path={"/report"} element={<Report/>} />
          <Route exact path={"/appointmentreport"} element={<AppointmentReport/>} />
        </Routes>
       
      </div>

    </div>
  );
}

export default App;
