const Admins =require("../models/adminModel") ; 
const Users = require("../models/userModel") 
const Experts=require("../models/expertModel")
const bcrypt =require("bcrypt");
const { createError } =require("../utils/error");
const jwt =require("jsonwebtoken");
const Category = require("../models/category")




const adminController = {
login :async (req, res, next) => {
  try {
    const {email, password} = req.body
    console.log(req.body);
    const admin = await Admins.findOne({email})
    console.log(admin)
    if (!admin) {
        
        return res.status(400).json({msg: "Please check the email"});
    }
    if (admin.password == password) {
        console.log("not admin")
        // const token = jwt.sign({
          
        //     _id: admin._id,
        //     email: admin.email
        // }, process.env.JWT_SECRET_KEY)
       
        return res.json({msg: "Login Successful"});
    } else {
        return res.status(400).json({msg: "Please check the password"});
    }


} catch (error) {
    console.log("catch")

    return res.status(500).json({msg: error.message});
}
}
,

 blockUser :async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const user = await Users.findByIdAndUpdate({
                _id: id
            }, {blockStatus: true})
            return res.json({msg: "block Updated!", details: user});
        } else {
            return res.status(400).json({msg: "Not updated"});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message});
}
}

,


blockExpert :async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            const user = await Experts.findByIdAndUpdate({
                _id: id
            }, {block: true})
           
            return res.json({msg: "block Updated!", details: user});
        } else {
            return res.status(400).json({msg: "Not updated"});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message});
}
},
unblockUser : async (req, res) => {
  const id = req.params.id;
  try {
      if (id) {
          const user = await Users.findByIdAndUpdate({
              _id: id
          }, {blockStatus: false})
          return res.json({msg: "block Updated!", details: user});
      } else {
          return res.status(400).json({msg: "Not updated"});
      }

  } catch (error) {
      return res.status(500).json({msg: error.message});
}
}
,
unblockExpert : async (req, res) => {

    const id = req.params.id;
   
    try {
        if (id) {
            const user = await Experts.findByIdAndUpdate({
                _id: id
            }, {block: false})
            return res.json({msg: "block Updated!", details: user});
        } else {
            return res.status(400).json({msg: "Not updated"});
        }
  
    } catch (error) {
        return res.status(500).json({msg: error.message});
  }
  }
  ,

  expertPending:async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            const user = await Experts.findByIdAndUpdate({
                _id: id
            }, {approved: true})
           
            return res.json({msg: "approved!", details: user});
        } else {
            return res.status(400).json({msg: "Not updated"});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message});
}
}
,


userDetailes : async (req, res) => {
  const users = await Users.find()
  //    console.log(users);
  try {
      if (! users) {
          return res.status(400).json({msg: "No Users found"});
      } else {
          return res.json({msg: "Found it!", details: users});
      }
  } catch (error) {
      return res.status(500).json({msg: error.message});
}
},



expertDetails : async (req, res) => {
    const users = await Experts.find()
    //    console.log(users);
    try {
        if (! users) {
            return res.status(400).json({msg: "No Experts found"});
        } else {
            return res.json({msg: "Found it!", details: users});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message});
  }
  },
 category : async (req, res) => {
    try {
        const cat = await Category.find()
        if (!cat) {
            return res.status(400).json({msg: "No data"});
        } else {
            return res.json({msg: "category!", details: cat});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }

}
,
addCategory :async (req, res) => {
    newCat = req.body.category

    try {
        const result = await Category.findOne({category:{ $regex:new RegExp("^" +newCat.toLowerCase(),"i",) }})
        if (result) {
            return res.status(400).json({msg: "Already exist"});
        } else {
            let category = new Category({category: newCat})
            category.save()
            return res.json({msg: "category added!", details: category});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}
,
 deletCategory : async (req, res) => {
    id = req.params.id
    // console.log(id);
    try {
        if (id) {
            const user = await Category.findByIdAndDelete({_id: id})
            return res.json({msg: "Deleted successfuly!"});
        } else {
            return res.status(400).json({msg: "No data updated"});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }

}
,
}

module.exports=adminController;







// const express = require('express')
// const router = express.Router()
// const Admins = require('../models/adminModel')
// const Users = require('../models/userModel')

// const jwt = require('jsonwebtoken')





// const adminLogin = async (req, res) => {
//     try {
//         const {email, password} = req.body
//         const admin = await Admins.findOne({email})
//         console.log(admin)
//         if (! admin) {
//             return res.status(400).json({msg: "Please check the email"});
//         }
//         if (admin.password == password) {
//             const token = jwt.sign({
//                 _id: admin._id,
//                 email: admin.email
//             }, process.env.JWT_SECRET_KEY)
//             return res.json({msg: "Login Successful", token: token});
//         } else {
//             return res.status(400).json({msg: "Please check the password"});
//         }


//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }

// const userDetailes = async (req, res) => {
//     const users = await Users.find()
//     //    console.log(users);
//     try {
//         if (! users) {
//             return res.status(400).json({msg: "No Users found"});
//         } else {
//             return res.json({msg: "Found it!", details: users});
//         }
//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }

// const blockUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         if (id) {
//             const user = await Users.findByIdAndUpdate({
//                 _id: id
//             }, {blockStatus: true})
//             return res.json({msg: "block Updated!", details: user});
//         } else {
//             return res.status(400).json({msg: "Not updated"});
//         }

//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }

// const UnblockUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         if (id) {
//             const user = await Users.findByIdAndUpdate({
//                 _id: id
//             }, {blockStatus: false})
//             return res.json({msg: "Unblock Updated!", details: user});
//         } else {
//             return res.status(400).json({msg: "Not updated"});
//         }

//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }

// const category = async (req, res) => {
//     try {
//         const cat = await Category.find()
//         if (!cat) {
//             return res.status(400).json({msg: "No data"});
//         } else {
//             return res.json({msg: "category!", details: cat});
//         }
//     } catch (error) {
//         return res.status(500).json({msg: error.message})
//     }

// }

// const addCategory = async (req, res) => {
//     newCat = req.body.category

//     try {
//         const result = await Category.findOne({category:{ $regex:new RegExp("^" +newCat.toLowerCase(),"i",) }})
//         if (result) {
//             return res.status(400).json({msg: "Already exist"});
//         } else {
//             let category = new Category({category: newCat})
//             category.save()
//             return res.json({msg: "category added!", details: category});
//         }

//     } catch (error) {
//         return res.status(500).json({msg: error.message})
//     }
// }

// const deletCategory = async (req, res) => {
//     id = req.params.id
//     try {
//         if (id) {
//             const user = await Category.findByIdAndDelete({_id: id})
//             return res.json({msg: "Deleted successfuly!"});
//         } else {
//             return res.status(400).json({msg: "No data updated"});
//         }
//     } catch (error) {
//         return res.status(500).json({msg: error.message})
//     }
// }

// const addService = async(req,res) =>{
//     try {
//         const data = req.body.values;
//         // console.log(data);
//         const images = data.image.fileList;

//         //  console.log(images)

//         const dataimages = [];
//         const bar = new Promise((resolve, reject) => {
//           images.forEach(async (image, index, array) => {
//             // console.log(image);
//             const datas = await uploadToCloudinary(image.thumbUrl, "Service-images");
  
//             // console.log(datas.url);
  
//             dataimages.push(datas.url);
  
//             if (index === array.length - 1) resolve();
//           });
//         });
//         bar.then(() => {
//           const datenow = new Date();
//           const Dateposted = datenow.toDateString();
//         //   console.log(dataimages, "this is data");
//           const servicedetails = new Service({
//             title: data.title,
//             price: data.Price,
//             note:data.note,
//             discription:data.discription,
//             image: dataimages,
//             date: Dateposted,
//           });
//           servicedetails.save().then(() => {
//             res.json({ msg: "added successfully" });
//           });
//         });
//       } catch (error) {
//         console.log(error);
//       }
// }

// const getService = async(req,res)=>{
//     try {
//         const service = await Service.find()
//         if (!service) {
//             return res.status(400).json({msg: "No data"});
//         } else {
//             return res.json({msg: "Services!", details: service});
//         }
//     } catch (error) {
//         return res.status(500).json({msg: error.message})
//     }
// }

// const expertDetailes = async (req, res) => {
//     const users = await Expert.find({status:"pending"})
//     //    console.log(users);
//     try {
//         if (!users) {
//             return res.status(400).json({msg: "No Expert found"});
//         } else {
//             return res.json({msg: "Found it!", details: users});
//         }
//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }

// const acceptedExperts = async (req, res) => {
//     const users = await Expert.find({status:"accepted"})
//     //    console.log(users);
//     try {
//         if (!users) {
//             return res.status(400).json({msg: "No Experts found"});
//         } else {
//             return res.json({msg: "Found it!", details: users});
//         }
//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }

// const acceptExperts = async(req,res) =>{
//     const id = req.params.id;
//     try {
//         if (id) {
//             const user = await Expert.findByIdAndUpdate({
//                 _id: id
//             }, {status:"accepted"})
//             return res.json({msg: "Accepted Updated!", details: user});
//         } else {
//             return res.status(400).json({msg: "Not updated"});
//         }

//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }

// const blockExpert = async(req,res) =>{
//     const id = req.params.id;
//     try {
//         if (id) {
//             const user = await Expert.findByIdAndUpdate({
//                 _id: id
//             },{status:"blocked"})
//             // console.log(user);
//             return res.json({msg: "Block Updated!", details:user});
//         } else {
//             return res.status(400).json({msg: "Not updated"});
//         }

//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }

// const deleteServices = async (req, res) => {
//     id = req.params.id
//     console.log(id);
//     try {
//         if (id) {
//             const service = await Service.findByIdAndDelete({_id:id})
//             console.log(service);
//             return res.json({msg: "Deleted successfuly!"});
//         } else {
//             return res.status(400).json({msg: "No data deleted"});
//         }
//     } catch (error) {
//         return res.status(500).json({msg: error.message})
//     }
// }





// module.exports = {
//     adminLogin,
//     userDetailes,
//     blockUser,
//     UnblockUser,
//     category,
//     addCategory,
//     deletCategory,
//     addService,
//     getService,
//     expertDetailes,
//     acceptExperts,
//     blockExpert,
//     acceptedExperts,
//     deleteServices,
// }
