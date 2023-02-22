// import mongoose from "mongoose";
const mongoose =require("mongoose")


const AdminSchema = new mongoose.Schema({

    email:{
        type:String,
        required:[true,"please enter your email"],
      
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
   
    },
    

},{
    timestamps:true
})


const Admin= mongoose.model("Admins",  AdminSchema);
module.exports=Admin;