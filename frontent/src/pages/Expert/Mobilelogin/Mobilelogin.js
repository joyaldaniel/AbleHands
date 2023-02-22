// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { showErrMsg, showSuccessMsg } from '../../../components/User/utils/notification/Notification'
// import { isEmpty, isEmail, isLength, isMatch } from '../../../components/User/utils/validation/Validation'
// import "./Mobilelogin.css"

// const initialState = {
//     name: "",
//     email: "",
//     password: "",
//     cf_password: "",
//     city: "",
//     state: "",
//     gender: "",
//     servive: "",
//     address:"",
//     number:"",
//     price:"",
//     err: "",

// };

// function Mobilelogin() {
//     const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');

//     const Navigate = useNavigate()
//     const [user, setUser] = useState(initialState)
//     const [error, setError] = useState("");
//     const { name, email, password, cf_password, city, state, gender, service, err, success,address,number,price } = user
 
//     const handleChangeInput = e => {
//         const { name, value } = e.target
//         setUser({ ...user, [name]: value, err: '', success: '' })
//     }


//     const handleSubmit = async e => {
//         e.preventDefault()
//         if (isEmpty(name) || isEmpty(password))
//             return setUser({ ...user, err: "Please fill in all fields.", success: '' })

//         if (!isEmail(email))
//             return setUser({ ...user, err: "Invalid emails.", success: '' })

//         if (isLength(password))
//             return setUser({ ...user, err: "Password must be at least 6 characters.", success: '' })

//         if (!isMatch(password, cf_password))
//             return setUser({ ...user, err: "Password did not match.", success: '' })

//         if (!gender) {
//             setError("Please select a gender");
//         } else {
//             setError("");
           
//         }

         


//         try {
          
//             const res = await axios.post('/expert/expert_mobileregister', {
//                 name, email, password, city, state, gender, service,address,number,price

//             })
//             .then((response) => {
//                 console.log(response.data);
//                 setOtpSent(true);
//               })
//               .catch((error) => {
//                 console.log(error);
//               });

//             setUser({ ...user, err: '', success: res.data.msg })
//             console.log(res.data)


            

//            Navigate("/verify_otp")

          
//         } catch (err) {
            
//             err.response.data.msg &&
//                 setUser({ ...user, err: err.response.data.msg, success: '' })
//         }
//     }

//   return (
//     <div>
//        <div className="login_page">
//             <h2>Mobile Register</h2>
//             {err && showErrMsg(err)}
//             {success && showSuccessMsg(success)}


//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="name">Name</label>
//                     <input type="text" placeholder="Enter your name" id="name"
//                         value={name} name="name" onChange={handleChangeInput} />
//                 </div>

//                 <div>
//                     <label htmlFor="email">Email Address</label>
//                     <input type="text" placeholder="Enter email address" id="email"
//                         value={email} name="email" onChange={handleChangeInput} />
//                 </div>

//                 <div>
//                     <label htmlFor="password">Password</label>
//                     <input type="password" placeholder="Enter password" id="password"
//                         value={password} name="password" onChange={handleChangeInput} />
//                 </div>

//                 <div>
//                     <label htmlFor="cf_password">Confirm Password</label>
//                     <input type="password" placeholder="Confirm password" id="cf_password"
//                         value={cf_password} name="cf_password" onChange={handleChangeInput} />


// <div>
//         <label htmlFor="address">address:</label>
//         <input type="address" id="address" name="address" value={address}  onChange={handleChangeInput} />
//       </div>
//       <div>
//         <label htmlFor="number">PhoneNumber:</label>
//         <input type="phonenumber" id="number" name="number"  value={number} minLength={10} maxLength={15} onChange={handleChangeInput} />
//       </div>
//       <div>
//         <label htmlFor="price">Price:</label>
//         <input type="price" id="price" name="price" value={price} onChange={handleChangeInput} />
//       </div>


//                     <div>




//                         <label for="state" >Choose a state:</label>
//                         <select name="state" id="state" value={state} onChange={handleChangeInput} required >
//                             <option>select your state</option>
//                             <option value="kerala">kerala</option>
//                         </select>
//                     </div>
//                     <br />
//                     <br />

//                     <div>
//                         <label for="city" >Choose a city:</label>
//                         <select name="city" id="city" value={city} onChange={handleChangeInput} required >
//                             <option >select your city</option>
//                             <option value="Trivandrum">Trivandrum</option>
//                             <option value="kollam">kollam</option>
//                             <option value="Ernakulam">Ernakulam</option>
//                             <option value="kozhikode">kozhikode</option>
//                         </select>
//                     </div>
//                     <br />
//                     <br />
//                     <div>
//                         <label for="gender" >Choose your gender:</label>
//                         <select name="gender" id="gender" value={gender} onChange={handleChangeInput} required >
//                             <option >select your gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>

//                         </select>
//                     </div>
//                     <br />
//                     <br />
//                     <div>
//                         <label for="service" >Choose your service:</label>
//                         <select name="service" id="service" value={service} onChange={handleChangeInput} required >
//                             <option >select your service</option>
//                             <option value="Byestander">Byestander</option>
//                             <option value="Pick and Drop">Pick and Drop</option>

//                         </select>
//                     </div>
//                     <br />
//                     <br />

//                 </div>


//                 <div className="row">
//                     <button type="submit">Register</button>
//                 </div>
//             </form>

//             <p>Already an account? <Link to="/expert_login">Login</Link></p>
//         </div>
//     </div>
//   )
// }

// export default Mobilelogin
