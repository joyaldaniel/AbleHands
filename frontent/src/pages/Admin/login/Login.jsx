import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom'
// import Header   from '../Header/Header'
// import Body from "../body/Body"
import axios from "axios"
import { showSuccessMsg, showErrMsg } from "../../../components/User/utils/notification/Notification"
// import jwt from "jwt-decode"
import {GoogleLogin} from"react-google-login";
import FacebookLogin from "react-facebook-login"
import "./Login.css";

const initialState = {
    email: "",
    password: "",
    err: "",
    sucess: "",
};

function Login() {
    const Navigate = useNavigate()
    const [user, setUser] = useState(initialState);
    const { email, password, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value, err: "", success: "" })
    }
      
   
    const handlesubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post("/admin/admin_login", { email, password })
            setUser({ ...user, err: "", success: res.data.msg })

            localStorage.setItem("firstLogin", true)
            localStorage.setItem('firstLogin', true)
            localStorage.setItem('userInfo', res.data.data)
            //  const users = jwt(res.data.data)
            //  const email = users.email

            localStorage.setItem('email', email)

            Navigate('/dashboard')
        } catch (err) {
            // const { name, value } = err

            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: "" })
        }



    }

    //     const logUser = async e =>{
    //         e.preventDefault()
    //         try {
    //             const res = await axios.post(LOG_URL,{email,password})
    //             console.log(res);
    //             setUser({...user,err:'',success:res.data.msg});
    //             localStorage.setItem('firstLogin',true)
    //             localStorage.setItem('userInfo',res.data.data)
    //             const users = jwt(res.data.data)
    //             const userName = users.name
    //             localStorage.setItem('UserName',userName)
    //             navigate('/')

    //         } catch (err) {
    //            err.response.data.msg && setUser({...user,err:err.response.data.msg,success:''})
    //     }
    // }


    return (
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handlesubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        placeholder="enter your email address"
                        id="email"
                        value={email}
                        name="email"
                        onChange={handleChangeInput}
                    />
                </div>

                <div>
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        placeholder="enter your password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <button className="buttonSubmit" type="submit">Login</button>

                    
                    <div className="social">
                    <div className="hr">or Login with</div>
                        
                    </div>


                    
                </div>




            </form>
        </div>
    );
}

export default Login;
