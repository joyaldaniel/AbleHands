const mongoose=require('mongoose')

const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        trim:true
    },
    blockStatus:{
        type:Boolean,
        default:false

    }
    ,
    role:{
        type:Number,
        default:0 // 0=user,1=admin
       
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/dnkspkbiw/image/upload/v1673108027/kisspng-computer-icons-user-profile-login-avatar-description-5ada41a37ecc31.1344108915242530915194_klja9q.jpg"
    },
    

},{
    timestamps:true
})

 const usermodel=mongoose.model("Users",userScheme)
module.exports=usermodel