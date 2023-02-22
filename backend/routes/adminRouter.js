const express = require("express")
const router = require("express").Router()
const adminController = require("../controllers/adminController")
const authAdmin = require("../middlewares/authAdmin")





router.post('/admin_login', adminController.login)

router.get('/all_user',adminController.userDetailes)
router.put('/block/:id',adminController.blockUser)
router.put('/unblock/:id',adminController.unblockUser)

router.get('/category',adminController.category)
router.post('/addcategory',adminController.addCategory)
router.delete('/delete-category/:id',adminController.deletCategory)

router.get("/all_expert",adminController.expertDetails)
router.put('/expertblock/:id',adminController.blockExpert)
router.put('/expertunblock/:id',adminController.unblockExpert)

router.get("/expert_approve",adminController.expertDetails)
router.put('/expertPending/:id',adminController.expertPending)

module.exports=router