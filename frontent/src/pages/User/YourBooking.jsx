// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/User/YourBooking.css"
// import { Card, Typography, Spin, Row, Col } from "antd";
// import Helmet from "../../components/User/Helmet/Helmet"

// import Header from '../../components/User/Header/Header'
// import { useLocation } from "react-router-dom";
// import { Container } from "reactstrap";
// // import Title from "antd/es/skeleton/Title";

// // const { Title } = Typography;

// function YourBooking() {
//   const [items, setItems] = useState({});
//     const location=useLocation()
//     const ExpertEmail=location.state
//     console.log(ExpertEmail,"expertEmail")
//     const userId=localStorage.getItem("email")
//     console.log(userId)
    

//     // const [loading, setLoading] = useState(true);
//     // const [approved, setApproved] = useState(false);
  

//   useEffect(() => {
//     axios.post("/user/expert_expertprofileDetails",{ExpertEmail}) 
//     .then(response => {
     
//       const items = response.data.expert;
//       setItems(items)
//       console.log(items.name,"hello")
//     })
//     // axios.post("/expert/order-status")
//     // .then(res => {
//     //   setLoading(false);
//     //   setApproved(res.data.Status);
//     // })
    

//       .catch(err => {
//         console.error(err);
      
//       });
//   }, []);
//   return (
// <Helmet tiitle={items.Name}>
//   <section>
//     <Header/>
//   <Container>
//     <Row>
//       <Col>
//       <Col lg="6">
//               <img src={items.image} alt="" className="w-100" />
//             </Col>
//             <Col lg="6">

//               <div className="car__info"> 
//                 <h2 className="section__title">{items.Name}</h2>

//                 <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
//                   <h6 className="rent__price fw-bold fs-4">
//                    {items.price}.00 / Day
//                   </h6>

//                   <span className=" d-flex align-items-center gap-2">
//                     <span style={{ color: "#f9a826" }}>
//                       <i class="ri-star-s-fill"></i>
//                       <i class="ri-star-s-fill"></i>
//                       <i class="ri-star-s-fill"></i>
//                       <i class="ri-star-s-fill"></i>
//                       <i class="ri-star-s-fill"></i>
//                     </span>
//                     ({items.rating} ratings)
//                   </span>
//                 </div>

//                 <p className="section__description">
//                   {items.name}
//                 </p>

//                 <div
//                   className=" d-flex align-items-center mt-3"
//                   style={{ columnGap: "4rem" }}
//                 >
//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       class="ri-roadster-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {items.service}
//                   </span>

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       class="ri-settings-2-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {items.gender}
//                   </span>

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       class="ri-timer-flash-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {items.number}
//                   </span>
//                 </div>

//                 <div
//                   className=" d-flex align-items-center mt-3"
//                   style={{ columnGap: "2.8rem" }}
//                 >
//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
//                     {items.state}
//                   </span>

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       class="ri-wheelchair-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {items.city}
//                   </span>

//                   <span className=" d-flex align-items-center gap-1 section__description">
//                     <i
//                       // class="ri-building-2-line"
//                       style={{ color: "#f9a826" }}
//                     ></i>{" "}
//                     {/* {items.data} */}
//                   </span>
//                 </div>
//               </div>
//             </Col>
//     <div>
    
//       {/* <div className="order-status-container">
//       { loading ? (
//         <Spin size="large" 
//         />
//       ) : (
//         <Card className="order-status-card">
//           <Title level={2}>Order Status</Title>
//           { approved ? (
//             <p>Your Booking has been approved!</p>
//           ) : (
//             <p>Your Booking is currently pending.Wait for the expert approval</p>
//           )}
//         </Card>
//       )}
//     </div> */}

//     </div>
//     </Col>
//     </Row>
//     </Container>
//     </section>
//     </Helmet>
//   )
// }

// export default YourBooking

import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Header from '../../components/User/Header/Header'

function YourBooking() {
  const navigate = useNavigate()
  return (
    <div >
        <Header/>
      <div  style={{textAlign:'center',paddingTop:"200px",borderBlock:"10px",color:"black" }}>
      
        <h1> your order is success</h1>
        <button style={{backgroundColor:"black",color:"white",borderRadius:"20px"}} onClick={()=>{
          navigate("/home");
        }}>Back to home</button>
       </div>
    </div>
  )
}

export default YourBooking

