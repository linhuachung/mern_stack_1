const express = require('express')
const router = express.Router()
const verifyToken = require("../middleware/auth")
const Post = require('../models/Post')
var mongoose = require('mongoose');

0
//@route POST api/posts
//@desc Create post
// @access Private

router.get('/', verifyToken, async (req,res) => {
    try{
        console.log(req.body)
        const posts = await  Post.find({user:req.userId}).populate("user",['username'])
        res.json({success: true, posts })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

router.post('/', verifyToken, async (req,res) => {
    const {title, description, url, status} = req.body

//    simple validation
    if(!title) return res.status(400).json({success: false , massage:"Title is required"})
    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status: status || "TO LEARN",
            user:  req.userId
        })
        await newPost.save()
        res.json({success: true, message: 'Happy learning', post: newPost })
    }catch (error) {
        res.status(500).json({success: false, message: "Interval server error"})
    }
})


router.put('/:id' , verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body
    if(!title) return res.status(400).json({success: false , massage:"Title is required"})
    try {
        let updatedPost = {
            title,
            description: description || "",
            url: ((url.startsWith('https://')) ? url : `https://${url}`) || "",
            status: status || "TO LEARN",
        }
        const postUpdateCondition = {_id: req.params.id, user: req.userId}
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new:true})
        // user not authorised to update post
        if(!updatedPost) return  res.status(401).json({success: false, message: "post not found or user not verify" })
        res.json({success: true, message: 'update success', post:updatedPost })
    }catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

router.delete('/:id' , verifyToken, async (req, res) => {
    try{
        const postDeleteCondition = {_id: req.params.id, user:req.userId}
        const deletePost = await Post.findByIdAndDelete(postDeleteCondition)
        if(!deletePost) return  res.status(401).json({success: false, message: "post not found or user not verify" })
        res.json({success: true, message: 'Delete success', post:deletePost })
    }catch (error) {
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

module.exports = router
