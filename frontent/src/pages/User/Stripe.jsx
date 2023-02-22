import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Col, FormGroup } from 'reactstrap';
import Header from "../../components/User/Header/Header"

function Stripe() {

    const location = useLocation()
  const items = location.state
  console.log(items);
    const [formData, setFormData] = useState({});

    const handleInputChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
//  const   userId=localStorage.getItem("email")
    const handleCheckout =async () => {
        const res= await  axios.post("/user/stripe_payment",  items )
  
    window.location.href=res.data.url

    };
  
  return (

    
    <div>
        <Header/>
        <FormGroup>

<Col lg="5" className="mt-5">
  <div className="payment__info mt-5">
    <h5 className="mb-4 fw-bold ">Payment Information</h5>
    {/* <PaymentMethod /> */}

    <div className="payment">
      <label htmlFor="payment" className="d-flex align-items-center gap-2" >
        {/* <input type="radio" /> Direct Bank Transfer */}
      </label>
    </div>

    <div className="payment mt-3">
      <label htmlFor="payment" className="d-flex align-items-center gap-2">
        {/* <input type="radio" /> Cheque Payment */}
      </label>
    </div>

    <div className="payment mt-3 d-flex align-items-center justify-content-between">
      <label htmlFor="payment" className="d-flex align-items-center gap-2">
        {/* <input type="radio" /> Master Card */}
      </label>

      <img
        // src={masterCard} 
        alt="" />
    </div>

    <div className="payment mt-3 d-flex align-items-center justify-content-between">
      <label htmlFor="ByHand" className="d-flex align-items-center gap-2">
        {/* <input type="radio" name="ByHand" id="ByHand" value="ByHand"  /> ByHand */}
      </label>


      <img
        // src={paypal} 
        alt="" />
    </div>
    <div className="payment mt-3 d-flex align-items-center justify-content-between">
      <label htmlFor="stripe" className="d-flex align-items-center gap-2" required  >
        <input type="radio" name="paymentOpt" id="stripe" value="stripe" 
          //  checked={selectedOption === "stripe"} 
         
          onChange={handleInputChange}
        /> Stripe
      </label>


      <img
        // src={paypal}
        alt="" />
    </div>
    <div className="payment text-end mt-5">
      <p>Please Click here to conform the Reservation after the payment</p>
      <button
      //  onClick={()=>{
      //   navigate('/your_order',{state:Expertemail})
      //  }}
      onClick={() => handleCheckout()} 
      >Reserve Now</button>
    </div>

  </div>
</Col>
</FormGroup>
    </div>
  )
}

export default Stripe
