import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Expert/header/ProfileHeader";
import {Image} from "cloudinary-react"
function Profile() {
  const Navigate = useNavigate();

  const [imageSelected,setImageSelected]=useState('')
 

  const handleSubmit = async(e) => {
   
    e.preventDefault()
   
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "cysckp8v");
 const res=  await axios.post("https://api.cloudinary.com/v1_1/dnkspkbiw/image/upload", formData,)
      .then((response) => {
        console.log(response);


        const url=response.data.url
        console.log(url)
   const email=localStorage.getItem("email")
   console.log("hi")
  axios.patch("/expert/profilepicture",{email,url})
   .then((response)=>{
    console.log(response)
    if(!localStorage==null){
    Navigate("/expert_login")
    }else 
    {
      Navigate("/expert_home")
    }
   })
      


      }).catch((error)=>{
        console.log(error)
      })
     
  };

  return (
    <div className="login_page">
      <Header />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Profile Image:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
        </div>

        <button type="submit">Submit</button>
        <Image cloudName="dnkspkbiw"/>
        <br />
      </form>
    </div>
  );
}

export default Profile;
