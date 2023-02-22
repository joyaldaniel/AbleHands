// import axios from "axios";
// import React, { useState } from "react";
// import "./OtpPage.css";
// function OtpPage() {
//   const [otp, setOTP] = useState("");

//   const handleOTPChange = (event) => {
//     setOTP(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     console.log("Submitting OTP:", otp);
//     const res=axios.post("/expert/verify_otp",{otp})
    
//     // TODO: Implement OTP verification logic
//   };
//   return (
//     <div>
//          <div className="container">
//       <h1>OTP Verification</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="otp">Please enter the OTP code sent to your phone:</label>
//         <input type="numbere" id="otp" name="otp" value={otp} onChange={handleOTPChange} minLength={6} maxLength={6} required />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
  
//     </div>
//   )
// }

// export default OtpPage
