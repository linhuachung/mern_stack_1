const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
// @router POST api/auth/register
// @desc Register user
// @access Public

router.post('/register',async (req,res) => {
    const {username, password} = req.body
    // Simple validation
    if (!username || !password) return res.status(400).json({success: false , massage:"Missing user name and/or password"})
    try{
    //    check for existing user
        const user = await  User.findOne({username})
        if(user) return res.status(400).json({success: false, message: 'Username already taken'})
    //    all good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword
        })
        await newUser.save()
    //    return token
        const accessToken = jwt.sign({userId: newUser._id
        }, process.env.ACCESS_TOKEN_SECRET)
        res.json({succses:true, message: "user created successfully", accessToken})
    }catch (error){
        console.log(error)
        res.status(500).json({success: false,message: "Internal server error"})
    }
} )

// @router POST api/auth/login
// @desc Register user
// @access Public

router.post('/login',async (req, res) => {
    const {username, password} = req.body
    // Simple validation
    if (!username || !password) return res.status(400).json({success: false , massage:"Missing user name and/or password"})
    try{
    //    check for existing user
        const user = await User.findOne({username})
        if(!user) return res.status(400).json({success:false, message: "incorrect username or password "})
    //    username found
        const passwordValid = await  argon2.verify(user.password, password)
        if(!passwordValid) return res.status(400).json({success:false, message: "incorrect username or password "})
    //    all good
    //    return token
        const accessToken = jwt.sign(
            {userID: user._id},
            process.env.ACCESS_TOKEN_SECRET
        )
        res.json({
            success: true,
            message:"Login successfully",
            accessToken
        })
    }catch (error) {
        console.log(error)
    }
})

module.exports = router
