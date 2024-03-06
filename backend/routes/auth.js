const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET='ranjankumaryadaviamfromnepal';

// ROUTE 1: Create a user using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isLength({ min: 5 }),
    body('password','Password must be atleast 5 character').isLength({ min: 5 }),
], async(req,res)=>{
  // if there are errors, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
     //check whether the user with this email exists already
                          
     try{
      let user = await User.findOne({email:req.body.email});
      if(user){
        return res.status(400).json({error:"Sorry a user with this emial already exists"})
      } 
      // for bcrypt auth password
      const salt =await  bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
              
      //create a new user
     user = await User.create({                  
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });  

       // for user token
       const data = {
        user:{
          id: user.id
        }
       }
       
       const authtoken = jwt.sign(data, JWT_SECRET);
        res.json(authtoken)
      // res.json(user)

    }catch(error){
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
    
})
// ROUTE 2: if there are errors, return: POST "api/auth/login". No login required

router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()
], async(req,res)=>{

// if there are errors, return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email});

    if(!user){
      return res.status(400).json({error:"Please try to login with correct credentials"});
    }
    const passwordCompare =  await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error:'Please try to login with correct credentials'});
    }

     const data ={
      user:{
        id:user.id
      }
     }
     const authtoken = jwt.sign(data, JWT_SECRET);
        res.json(authtoken)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Get loggedin Userr Details Using: POST "/api/auth/getuser". Login required

router.post('/getuser',fetchuser, async(req,res)=>{
try {
  const userId = req.user.id;
  const user = await User.findById(userId).select('-password');
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})
module.exports = router;