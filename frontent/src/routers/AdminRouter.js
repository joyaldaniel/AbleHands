// import Home from "./pages/home/Home"; 
// import Login from "../pages/Admin/login/Login.jsx";
// import List from "./pages/list/List";
// import Single from "./pages/single/Single";
// import New from "./pages/new/New";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "../context/AuthContext";
// import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
// import NewHotel from "./pages/newHotel/NewHotel";
// import NewRoom from "./pages/newRoom/NewRoom";

// function App() {
//   const { darkMode } = useContext(DarkModeContext);

//   const ProtectedRoute = ({ children }) => {
//     const { user } = useContext(AuthContext);

//     if (!user) {
//       return <Navigate to="login" />;
//     }

//     return children;
//   };

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/">
//             <Route path="login" element={<Login />} />
//             <Route
//               index
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="users">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <List columns={userColumns} />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path=":userId"
//                 element={
//                   <ProtectedRoute>
//                     <Single />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="new"
//                 element={
//                   <ProtectedRoute>
//                     <New inputs={userInputs} title="Add New User" />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="hotels">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <List columns={hotelColumns} />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path=":productId"
//                 element={
//                   <ProtectedRoute>
//                     <Single />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="new"
//                 element={
//                   <ProtectedRoute>
//                     <NewHotel  />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="rooms">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <List columns={roomColumns} />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path=":productId"
//                 element={
//                   <ProtectedRoute>
//                     <Single />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="new"
//                 element={
//                   <ProtectedRoute>
//                     <NewRoom  />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


import React, { useContext } from 'react'
import Login from "../pages/Admin/login/Login"
import { Route,Routes } from 'react-router-dom'
import Dashboard from '../pages/Admin/dashboard/Dashboard'
// import { AuthContext } from '../context/AuthContext'
import UserInfo from "../pages/Admin/userblock/UserBlock"
import Category from '../pages/Admin/category/Category'
import ExpertInfo from "../pages/Admin/expertblock/ExpertBlock"
import Approved from "../pages/Admin/Expertapprove/ExpertApprove"
import NotFound from "../pages/User/NotFound";

const AdminRouter=() =>{
  return (
   <Routes>
       <Route path='/admin_login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} exact/>
        <Route path='/userinfo' element={<UserInfo/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path="/expertinfo" element={<ExpertInfo/>}/>
        <Route path="/Expert_approved" element={<Approved/>}/>
        <Route path="*" element={<NotFound/>}/>
   </Routes>
     
  );
}

export default AdminRouter


