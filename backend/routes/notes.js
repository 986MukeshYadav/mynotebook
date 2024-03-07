const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



 //Router 1 :Get All the notes using: GET "api/auth/fecthallnotes .  login required"
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
   
    const notes = await Note.find({user:req.user.id});
    res.json(notes)
         
} catch(error){
    console.error(error.message);
    res.status(500).send('Internal Server Error');
 }
})

 //Router 2 :Add All the new  notes using: POST "api/auth/addnote .  login required"
 router.get('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min:3}),
    body('description','description must be atleast 5 characters').isLength({ min: 5 }),
 ],async(req,res)=>{
    try{

    
   
    const {title,descriptio,tag}=req.body;
    //If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,descriptio,tag,user :req.user.id
    })
    const savedNote= await note.save()

    res.json(savedNote)

}catch(error){
    console.error(error.message);
    res.status(500).send('Internal Server Error');
 }


 })
module.exports = router

