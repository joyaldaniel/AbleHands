const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
// require("dotenv").confiq();
const jwt = require("jsonwebtoken");
const sendMail = require("./sendmail");
const Expert =require("../models/expertModel")
const Stripe=require("stripe")
const stripe=Stripe(process.env.STRIPE_KEY)
const Order=require("../models/formModel")

const { CLIENT_URL } = process.env;

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activation/${activation_token}`;
      sendMail(email, url, "Verify your email address");

      res.json({
      //  status:"sucess",
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = new Users({
        name,
        email,
        password,
      });

      await newUser.save();

      res.json({ msg: "Account has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });
        if (user.blockStatus) {
          return res.status(400).json({msg: "Your are Banned"});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login success!" ,data:user});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      sendMail(email, url, "Reset your password");
      res.json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
   
    try {
        const {password} = req.body
        console.log(password)
        const passwordHash = await bcrypt.hash(password, 12)
       
        await Users.findOneAndUpdate({_id: req.user.id}, {
            password: passwordHash
        })

        res.json({msg: "Password successfully changed!"})
    } catch (err) {
      
        return res.status(500).json({msg: err.message})
    }
},
    getUserInfo:async(req,res) =>{
        try {
           const user = await Users.findById(req.user.id).select("-password")
           res.json(user)
        } catch (err) {
          return res.status(500).json({msg: err.message})
        }
    },
    getUserAllInfor: async (req,res)=>{
             try {
              const users = await Users.find().select("-password")
               res.json(users)
            
             } catch (err) {
          return res.status(500).json({msg: err.message})
             }
    }
    ,
    logout:async (req,res)=>{
      try {
        res.clearCookie('refreshtoken',{ path: "/user/refresh_token"})
        return res.json({msg:"Logged Out"})
      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
    },

    updateUser:async(res,req)=>{
            
      try {
         const {name,avatar}=req.body
         await Users.findOneAndUpdate({_id:req.user.id},{
          name,avatar
         })
         res.json({msg:"Update Success!"})

      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
    
    },
    
    
    updateUsersRole:async(res,req)=>{
            
      try {
         const {role}=req.body
         await Users.findOneAndUpdate({_id:req.params.id},{
         role
         })
         res.json({msg:"Update Success!"})

      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
    
    },

    deleteUser:async(res,req)=>{
            
      try {
        
         await Users.findByIdAndDelete({_id:req.params.id},{
         role
         })
         res.json({msg:"Deleted Success!"})

      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
    
    },
    getexpert:async  (req, res) => {
      Expert.find({approved:true}, (err, items) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(items);
      });
    }
   ,
   getexpertdetails:async  (req, res) => {
    const id = req.params.id
    try {
      const expert = await Expert.findById(id)
      return res.status(200).send(expert)
      
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
    
    
  },
  paymentdetails: async (req, res) => {
    try {
    const Expertemail=req.body.Expertemail
    const journeyDate=req.body.formData.journeyDate
    const journeyTime=req.body.formData.journeyTime
    console.log(req.body);
    console.log(journeyDate,"hoise")
     
      // const { Expertemail, journeyTime, journeyDate } = req.body;
  
      const existingOrder = await Order.findOne({
        Expertemail,
        journeyTime,
        journeyDate,
        status: "false"
      });
      
    console.log(existingOrder,"hellomonu");
      if (existingOrder) {
        return res.status(400).json({ message: 'This time slot is already booked!.' });
      }
  
      const newOrder = await Order.create({
        Expertemail: req.body.Expertemail,
        firstName: req.body.formData.firstName,
        lastName: req.body.formData.lastName,
        email: req.body.formData.email,
        phoneNumber: req.body.formData.phoneNumber,
        fromAddress: req.body.formData.fromAddress,
        person: req.body.formData.person,
        luggage: req.body.formData.luggage,
        journeyDate: req.body.formData.journeyDate,
        journeyTime: req.body.formData.journeyTime,
        textarea: req.body.formData.textarea,
        pinnumber: req.body.formData.pinnumber,
        paymentOpt: req.body.formData.paymentOpt,
        userId: req.body.userId,
        status: false // set the status to false for new orders
      });
  
      res.json({ message: 'Payment details saved successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving payment details.' });
    }
  }
  // paymentdetails : async (req, res) => {
  //   try {
  //     const expertEmail = req.body.Expertemail;
  //     const journeyDate = req.body.formData.journeyDate;
  //     const journeyTimeStr = req.body.formData.journeyTime;
  
  //     if (!moment(journeyTimeStr, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
  //       return res.status(400).json({ message: 'Invalid journey time' });
  //     }
      
  //     // Convert journeyTime string to Unix timestamp
  //     const journeyTime = Date.parse(journeyTimeStr);
  //     if (isNaN(journeyTime)) {
  //       throw new Error('Invalid journey time');
  //     }
  
  //     const oneHourBefore = journeyTime - 60 * 60 * 1000;
  //     console.log(oneHourBefore);
  //     const oneHourAfter = journeyTime + 60 * 60 * 1000;
  //     console.log(oneHourAfter);
      
      
  //     const orderWithinOneHour = await Order.findOne({
  //       Expertemail: expertEmail,
  //       journeyDate: journeyDate,
  //       journeyTime: { 
  //         $gt: new Date(oneHourBefore).toISOString(), 
  //         $lt: new Date(oneHourAfter).toISOString() 
  //       },
  //       status: false,
  //     });
      
  //     if (orderWithinOneHour) {
  //       return res.status(400).json({
  //         message: 'Another user has already booked a time slot within one hour of this time.',
  //       });
  //     }
  
  //     // Create a new order with the provided details
  //     const newOrder = await Order.create({
  //       Expertemail: expertEmail,
  //       firstName: req.body.formData.firstName,
  //       lastName: req.body.formData.lastName,
  //       email: req.body.formData.email,
  //       phoneNumber: req.body.formData.phoneNumber,
  //       fromAddress: req.body.formData.fromAddress,
  //       person: req.body.formData.person,
  //       luggage: req.body.formData.luggage,
  //       journeyDate: journeyDate,
  //       journeyTime: journeyTime,
  //       textarea: req.body.formData.textarea,
  //       pinnumber: req.body.formData.pinnumber,
  //       paymentOpt: req.body.formData.paymentOpt,
  //       userId: req.body.userId,
  //       status: false,
  //     });
  
  //     res.json({
  //       message: 'Payment details saved successfully.',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       message: 'Error saving payment details.',
  //     });
  //   }
  // },
  ,
  
  ExpertprofileDetails:async(req,res)=>{
   
    const Expertemail=req.body.ExpertEmail
    // console.log(Expertemail,"expertBackend")
    try {
      const expert = await Expert.findOne({email:Expertemail})
     
      return res.status(200).send({expert})
      
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
    
        


  },
   stripe:async (req, res) => {
    console.log(req.body,"data")
    let data = req.body
  
   
    
    
    const session = await stripe.checkout.sessions.create({
      
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name:"Expert"
             
            },
            unit_amount: 1*100,
            
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/your_order`,
      cancel_url:  `${process.env.CLIENT_URL}/volenteerListing/details`,
    });
  
    const url=session.url
       res.send({url})
  },
  // bookingstime:async (req, res) => {
  //   try {
  //     const { Expertemail, journeyTime, journeyDate } = req.body;
  
  //     // Check if the requested time slot is already booked
  //     const existingBooking = await Order.findOne({ Expertemail, journeyTime,journeyDate });
  //     if (existingBooking) {
  //       return res.status(400).json({ message: 'This time slot is already booked' });
  //     }
  
  //     // Create a new booking and save it to the database
  //     const newBooking = new Booking({ doctor, time, bookedBy });
  //     await newBooking.save();
  
  //     res.json(newBooking);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // }
  //  async (req, res) => {
  //   const { expertId, userId, startTime, endTime } = req.body;
  
  //   // Check if the chosen time slot is available
  //   const existingBooking = await Booking.findOne({
  //     expertId,
  //     startTime: { $lt: endTime },
  //     endTime: { $gt: startTime },
  //   });
  
  //   if (existingBooking) {
  //     return res.status(400).json({
  //       message: 'That time slot is not available. Please choose another time.',
  //     });
  //   }
  
  //   // Create a new booking and save it to the database
  //   const newBooking = new Booking({
  //     expertId,
  //     userId,
  //     startTime,
  //     endTime,
  //   });
  
  //   await newBooking.save();
  
  //   res.status(201).json(newBooking);
  // });

};



function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userController;
