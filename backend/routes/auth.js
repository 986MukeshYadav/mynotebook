const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

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
    // check whether the user with this exits already
  try{
      let user = await User.findOne({email: req.body.email});
      if(user) {
        return res.status(400).json({error:"User already exists"});
    }
    //create a new user
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
      })
      res.json(user)
     }catch(error){
      console.error(error.message);
      res.status(500).send('Some error occurred');
   }
    })
   

module.exports = router