const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');



 //Router 1 :Get All the notes using: GET "api/auth/fecthallnotes .  login required"
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const notes = await Note.find({user:req.user.id});
    res.json(notes)
})
module.exports = router

