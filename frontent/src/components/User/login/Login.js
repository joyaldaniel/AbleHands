import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom'
// import Header   from '../Header/Header'
// import Body from "../body/Body"
import axios from "axios"
import { showSuccessMsg, showErrMsg } from "../utils/notification/Notification"
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
      
    const responseGoogle =async (response)=>{
        console.log(response);
        try {
            // const res =await axios.post("/user/google_login",{tokenId:response.tokenId})
            // setUser({...user, error:'', success: res.data.msg})
            // localStorage.setItem('firstLogin', true)
          
        } catch (err) {
            err.response.data.msg && setUser({...user,err:err.response.data.msg,sucess:" "})
            
        }
    }

    const responseFacebook =async (response)=>{
        console.log(response);
    }

    const handlesubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post("/user/login", { email, password })
            setUser({ ...user, err: "", success: res.data.msg })

            // localStorage.setItem("firstLogin", true)
            // localStorage.setItem('firstLogin', true)
            // localStorage.setItem('userInfo', res.data.data)
            //  const users = jwt(res.data.data)
            //  const email = users.email

            localStorage.setItem('email', email)

            Navigate('/home')
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
                        <GoogleLogin
                            clientId="535876330696-lpq703dc7p5juul3ht1pm9h47vs44brp.apps.googleusercontent.com"
                            buttonText="Login with google"
                            onSuccess={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                          <FacebookLogin
                appId="563593078984756"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                />
                    </div>


                    <Link to="/forgot_password" >Forgot your password</Link>
                    <Link to="/register" >New Customer</Link>
                    <Link to="/expert_login" >you are a Volenteer</Link>
                </div>




            </form>
        </div>
    );
}

export default Login;
