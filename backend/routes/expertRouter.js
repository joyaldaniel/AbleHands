const express = require("express")
const router = require("express").Router()
const expertController=require("../controllers/expertController")
const auth = require("../middlewares/auth")

router.post('/expert_register',expertController.register)
router.post('/expert_activation',expertController.activateEmail)
router.post('/expert_login',expertController.login)
router.post('/expert_refresh_token',expertController.getAccessToken)

router.post('/expert_forgetpassword',expertController.forgotPassword)
router.post('/expert_reset',auth,expertController.resetPassword)
router.patch('/profilepicture',expertController.profileUpdation)
router.post("/booking_details",expertController.bookingdetails)
router.post("/approve",expertController.orderApprove)
router.post("/reject",expertController.orderReject)
router.post("/expert_mobileregister",expertController.otpVerfication)
router.post("/verify_otp",expertController.verifyotp)




module.exports=router    