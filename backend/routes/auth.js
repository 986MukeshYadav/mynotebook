const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET ='Mukeshkumaryadaviamfromneapl';


//Router 1: Create a user using :post "api/auth/createuser" .Doesnot require Auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Pasword must be atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
  //If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
  try{
     // check whether the user with this exits already
      let user = await User.findOne({email: req.body.email});
      if(user) {
        return res.status(400).json({error:"User already exists"});
    }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);


    //create a new user
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass,
      });
      const data={
        user:{
          id:user.id
        }
      }
      //return json web token for authentication
      const authtoken= jwt.sign(data,JWT_SECRET);
      res.json(authtoken)


     }catch(error){
      console.error(error.message);
      res.status(500).send('Internal Server Error');
   }
    })

 //Router 2 : Authenticate a User using: post "api/auth/login . No login required"
 router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Pasword Cannot be blank').exists(),
],async (req,res)=>{
//If there are errors , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 
  const { email,password }=req.body;
try{
    let user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({error:"Please try to login with correct credentials"});
  }
    
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({error:"Please try to login with correct credentials"});
    }
    const data={
      user:{
        id:user.id
      }
    }
    //return json web token for authentication
    const authtoken= jwt.sign(data,JWT_SECRET);
    res.json(authtoken)


   }catch(error){
    console.error(error.message);
    res.status(500).send('Internal Server Error');
 }
  });

  //Router 3 : Get loginin user Details using POST "api/auth/getuser". login required
  router.post("/getuser", fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });



  module.exports = router

// for page 
