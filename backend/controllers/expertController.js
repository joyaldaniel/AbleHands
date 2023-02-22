const Expert = require("../models/expertModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendmail");
const { cloudinary } = require("../utils/cloudinary");
const Order = require("../models/formModel");
const randomize = require("randomatic");
const { ObjectId } = require("mongodb");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const Otp = require("../models/otpModel");
const Client = twilio(accountSid, authToken);
const { CLIENT_URL } = process.env;

const userController = {
  // otpVerfication: async (req, res) => { 
  //   try {
  //       console.log(req.body);
  //   const {
  //     name,
  //     email,
  //     password,
  //     city,
  //     state,
  //     gender,
  //     service,
  //     address,
  //     number,
  //     price,
    
  //   } = req.body;

  
  //   if (!name ||!email ||!password ||!number)
  //     return res.status(400).json({ msg: "Please fill in all fields." });
  //   if (!validateEmail(email))
  //     return res.status(400).json({ msg: "Invalid emails." });
  //   const user = await Expert.findOne({ email });
  //   if (user)
  //     return res.status(400).json({ msg: "This email already exists." });
  //   // const mobilenumber = await Expert.findOne({ number });
  //   // if (mobilenumber)
  //   //   return res.status(400).json({ msg: "This mobile number already exist" });
  //   if (password.length < 6)
  //     return res
  //       .status(400)
  //       .json({ msg: "Password must be at least 6 characters." });
  //   const passwordHash = await bcrypt.hash(password, 12);
  //   const newUser = {
  //     name,
  //     email,
  //     password:passwordHash,
  //     city,
  //     state,
  //     gender,
  //     service,
  //     address,
  //     number,
  //     price,
     
  //   };

    
      
      
    
  //     // Generate a random 6-digit OTP
     
    
  //     // Generate a random 6-digit OTP
  //     let otp = Math.floor(100000 + Math.random() * 900000).toString();
  //     otp = otp;
    
  //     // Send the OTP to the user's phone number via Twilio
  //     console.log(number)
     
  //     try {
  //       const message = await Client.messages.create({
  //         body: `Your OTP for registration is ${otp}`,
  //         from: +18148080447,
  //         to: number,
          

  //       });
  //       console.log(message.sid);
  //       return res.json({data:message.sid,newUser})
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(500).json({ msg: "Failed to send OTP" });
  //     }
    
  //     // await Expert.save();
  //     // res.json({ msg: "User registered successfully" });
  //   }
  // catch(err){
  //    console.log(err)
  // }
    
  
      
    
  // },
  otpVerfication: async (req, res) => {

  try {
        console.log(req.body);
    const {
      name,
      email,
      password,
      city,
      state,
      gender,
      service,
      address,
      number,
      price,
    
    } = req.body;

  
    if (!name ||!email ||!password ||!number)
      return res.status(400).json({ msg: "Please fill in all fields." });
    if (!validateEmail(email))
      return res.status(400).json({ msg: "Invalid emails." });
    const user = await Expert.findOne({ email });
    if (user)
      return res.status(400).json({ msg: "This email already exists." });
    // const mobilenumber = await Expert.findOne({ number });
    // if (mobilenumber)
    //   return res.status(400).json({ msg: "This mobile number already exist" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters." });
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = {
      name,
      email,
      password:passwordHash,
      city,
      state,
      gender,
      service,
      address,
      number,
      price,
    
    }
    const { phone } = req.body;
  const otp = generateOTP();

  // Save the OTP to the database
  Expert.findOneAndUpdate({ number }, { otp }, { upsert: true, new: true }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Send the OTP via SMS
      Client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: '+18148080447',
        to: number
      }).then(() => {
        res.json({ message: 'OTP sent successfully' });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
      });
    }
  })



  }catch(err){
       console.log(err)
    }
  
   },

  verifyotp:async(req, res) => {
    const { name,
      email,
      password:passwordHash,
      city,
      state,
      gender,
      service,
      address,
      number,
      price, } = req.body;

  Expert.findOne({ phone, otp }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!user) {
      res.status(400).json({ error: 'Invalid OTP' });
    } else {
      // Save user data to the database
      const userData = { name,
        email,
        password:passwordHash,
        city,
        state,
        gender,
        service,
        address,
        number,
        price,};
      const newUser = new Expert(userData);
      newUser.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ message: 'OTP verified and user data saved' });
        }
      });
    }
  });

  }
,


  register: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        city,
        state,
        gender,
        service,
        address,
        number,
        price,
      } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const user = await Expert.findOne({ email });
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
        password,
        city,
        state,
        gender,
        service,
        address,
        number,
        price,
      };
    

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/expert/expert_activation/${activation_token}`;
      sendMail(email, url, "Verify your email address");

      res.json({
        status: "sucess",
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

      const {
        name,
        email,
        password,
        city,
        state,
        gender,
        service,
        address,
        number,
        price,
      } = user;

      const check = await Expert.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });
      const newExpert = new Expert({
        name,
        email,
        password,
        city,
        state,
        gender,
        service,
        address,
        number,
        price,
      });
      await newExpert.save();
      res.json({
        msg: "Account has been activated please wait for admin approve!",
      });
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(400).json({ msg: "Invalid activation token" });
      }
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Expert.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });
      if (user.block) {
        return res.status(400).json({ msg: "Your are Banned" });
      }
      if (user.approved == false) {
        return res.status(400).json({ msg: "Please wait for admin approve." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/expert/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login success!", data: user });
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
      const user = await Expert.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/expert/reset/${access_token}`;

      sendMail(email, url, "Reset your password");
      res.json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      console.log(password);
      const passwordHash = await bcrypt.hash(password, 12);

      await Expert.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/expert/refresh_token" });
      return res.json({ msg: "Logged Out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  profileUpdation: async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const url = req.body.url;
    console.log("helloooooooo", email);
    try {
      const response = await Expert.updateOne(
        { email: email },
        { $set: { image: url } }
      );
      const expert = response;
      console.log("response  is : ", Expert);

      res.status(200).json({ expert });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  bookingdetails: async (req, res) => {
    const Expertemail = req.body.email;

    try {
      const response = await Order.find(
        { Expertemail: Expertemail },
        (err, orders) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.json(orders);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
  orderApprove: async (req, res) => {
    const id = req.body.bookingId;
    console.log(req.body);

    try {
      if (id) {
        const user = await Order.findByIdAndUpdate(
          {
            _id: ObjectId(id),
          },
          { status: true }
        );
        console.log(user, "hi");
        return res.json({ msg: "approve Updated!", details: user });
      } else {
        return res.status(400).json({ msg: "Not updated" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  orderReject: async (req, res) => {
    const id = req.body.bookingId;
    console.log(req.body);

    try {
      if (id) {
        const user = await Order.findByIdAndUpdate(
          {
            _id: ObjectId(id),
          },
          { status: false }
        );
        console.log(user, "hi");
        return res.json({ msg: "approve Updated!", details: user });
      } else {
        return res.status(400).json({ msg: "Not updated" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
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

function generateOTP() {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}
module.exports = userController;
