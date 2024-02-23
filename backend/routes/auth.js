const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET ='Mukeshkumaryadaviamfromneapl';


//Create a user using :post "api/auth/createuser" .Doesnot require Auth
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
        users:{
          id:user._id
        }
      }
      //return json web token for authentication
      const authtoken= jwt.sign(data,JWT_SECRET);
      res.json(authtoken)


     }catch(error){
      console.error(error.message);
      res.status(500).send('Some error occurred');
   }
    })
   

module.exports = router

// for page 
