//app.js is a common filename used for the main entry point or main application file in a Node.js or Express.js application.
//In this file, you typically write the code that initializes and configures your application, sets up routes, middleware, and handles server startup.
//here we are importing  React Router DOM and it is a library

import SignUpScreen from "./Screens/signUpScreen";
import LoginScreen from "./Screens/loginScreen";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResidentScreen from "./Screens/residentScreen";
import ComplaintScreen from "./Screens/complaintScreen";
import AssignPending from "./Screens/AssignPending";
import AnnouncementScreen from './Screens/AnnouncementScreen';
import ServicesScreen from './Screens/ServicesScreen'
import AddSupervisor from "./Screens/AddSupervisor";
import AddWorker from "./Screens/AddWorker";
import './App.css'

import UpdateProfileScreen from "./Screens/UpdateProfileScreen";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/signup" element={<SignUpScreen />} />
        <Route exact path="/resident/homePage" element={<ResidentScreen />} />
        <Route exact path="/resident/UpdateProfile" element={<UpdateProfileScreen />} />
        {/* <Route exact path="/resident/ComplainProfile" element={<ComplainProfileScreen />} /> */}
        <Route exact path="/admin/AssignPending" element={<AssignPending />} />
        <Route exact path="/resident/complaints" element={<ComplaintScreen />} />
        <Route exact path='/admin/announcementScreen' element={<AnnouncementScreen />} />
        <Route exact path='/admin/ServicesScreen' element={<ServicesScreen />} />
        <Route exact path='/admin/AddSupervisor' element={<AddSupervisor />} />
        <Route exact path='/admin/AddWorker' element={<AddWorker/>} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
