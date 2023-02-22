
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css";
import Header from "../../../components/Expert/header/ExpertHeader"




const Booking = () => {

    const email=localStorage.getItem("email")
   
    const [bookingDetails, setBookingDetails] = useState([]);
    

useEffect(() => {
    
const fetchData = async () => {
const response = await axios.post("expert/booking_details",{email:email});
setBookingDetails(response.data);


};
fetchData()


}, []);




    const handleApprove = async (bookingId) => {
        
        try {
        await axios.post("/expert/approve",{bookingId:bookingId})
        const updatedBookingDetails = bookingDetails.map((booking) => {
        if (booking._id === bookingId) {
        return { ...booking, status: "true" };
        }
        return booking;
        });
        setBookingDetails(updatedBookingDetails);
      
        } catch (error) {
        console.error(error);

        }
        };
       
        const handleReject = async (bookingId) => {
            
        try {
        await axios.post("expert/reject",{bookingId:bookingId});
        const updatedBookingDetails = bookingDetails.map((booking) => {
        if (booking._id === bookingId) {
        return { ...booking, status: "false" };
        }
        return booking;
        });
        setBookingDetails(updatedBookingDetails);
       
        } catch (error) {
        console.error(error);

        }
        };
       

  return (
  <div>
  <Header/>

    <div className="admin-page">
       
    <h1>Booking Requests</h1>
    <table className="requests-table">
    <thead >
    <tr>
    
    <th>Name</th>
    <th>Date</th>
    <th>Time</th>
    <th>Location</th>
    <th>pinnumber</th>
    <th>Number</th>
    <th>Message</th>
    <th>Persons</th>
    <th>Lagguage</th>
   
    </tr>
    </thead>
    <tbody>
        
    {bookingDetails.map((booking) => (
    <tr key={booking._id}>
   
    <td>{booking.firstName}</td>
    <td>{booking.journeyDate}</td>
    <td>{booking.journeyTime}</td>
    <td>{booking.fromAddress}</td>
    <td>{booking.pinnumber}</td>
    <td>{booking.phoneNumber}</td>
    <td>{booking.textarea}</td>
    <td>{booking.person}</td>
    <td>{booking.luggage}</td>
    
    <td>
    {booking.status === "false" ?
  
    <button className="approve-button" onClick={() => handleApprove(booking._id)}>
    Approve
    </button>
    :
    <button className="reject-button" onClick={() => handleReject(booking._id)}>
    Reject
    </button>
    

    }
    </td>
    </tr>
    ))}
    </tbody>
    </table>
    </div>
    </div>
    );
    };
    
    
    
    
    
    

export default Booking
