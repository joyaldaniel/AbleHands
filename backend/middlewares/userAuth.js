const jwt = require('jsonwebtoken')

const Users = require('../models/userModel');

const authUser = async (req, res, next) => {
    let token;
   
    if (req.headers.authorization) {
       
        try {
            token = req.headers.authorization
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.expert = await Users.findOne({_id:decoded._id})

            next()

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
    if (! token) {
        return res.status(400).json({msg: "Invalid authentication."})
    }
}

module.exports = {
authUser
}