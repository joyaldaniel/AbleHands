import React from "react";
import { Route,Routes } from "react-router-dom";
import Login from "../pages/Expert/login/ExpertLogin";
import Register from "../pages/Expert/register/ExpertRegister"
import Home from "../pages/Expert/home/ExpertHome"
import Profile from "../pages/Expert/Profile/Profile"
import Booking from "../pages/Expert/booking/Booking"
import NotFound from "../pages/User/NotFound";
import Mobilelogin from "../pages/Expert/Mobilelogin/Mobilelogin";
import Otp from "../components/Expert/otppage/OtpPage"
import Chat from "../pages/Expert/chat/Chating.jsx"

const ExpertRouter=()=>{


    return(
        <Routes>
           <Route path='/expert_login' element={<Login/>} />
           <Route path="/expert_register" element={<Register/>}/>
           <Route path="/expert_Home" element={<Home/>}/>
           <Route path="/expert_Profile" element={<Profile/>}/>
           <Route path="/user_bookingDetails" element={<Booking/>}/>
           <Route path="*" element={<NotFound/>}/>
           <Route path="/mobile_login" element={<Mobilelogin/>}/>
           <Route path="/verify_otp" element={<Otp/>}/>
           <Route path="/expertchat" element={<Chat/>}/>
           
        </Routes>
    )

}


export default ExpertRouter
