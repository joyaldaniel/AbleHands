import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/User/Home";
import About from "../pages/User/About";
import VoluenteerListing from "../pages/User/VoluenteerListing";
import CarDetails from "../pages/User/CarDetails";
import Blog from "../pages/User/Blog";
import BlogDetails from "../pages/User/BlogDetails";
import NotFound from "../pages/User/NotFound";
import Contact from "../pages/User/Contact";
import Login from "../components/User/login/Login";
import Register from "../components/User/register/Register";
import ActivationEmail from "../components/User/auth/ActivationEmail";
import ForgetPassword from "../components/User/auth/ForgetPassword";
import Resetpassword from "../components/User/auth/Resetpassword";
import Paymentsucess from "../components/User/UI/CheckoutSucess"
import YourOrder from "../pages/User/YourBooking.jsx"
import Stripe from "../pages/User/Stripe.jsx"
import Chat from "../pages/User/ChatwithExpert"

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/user/activation/:activation_token" element={<ActivationEmail/>} />
      <Route path="/forgot_password" element={< ForgetPassword />} />
      <Route path="/user/reset/:id" element={<Resetpassword/>}/>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/VoluenteerListing" element={<VoluenteerListing />} />
      <Route path="/volenteerListing/details" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout_sucess" element={<Paymentsucess/>}/>
      <Route path="/your_order" element={<YourOrder/>}/>
      <Route path="/payment_stripe" element={<Stripe/>}/>
      <Route path="{*} "element={<NotFound/>}/>
      <Route path="/chat" element={<Chat/>}/>
      
      
    </Routes>
  );
};

export default Routers;
