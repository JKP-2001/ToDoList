require("dotenv").config();
const express = require('express');
const router = express.Router();
const User = require("../models/User");
const {body,validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET;

router.get("/",(req,res)=>{
    res.send("Hello");
})

//ROUTE1: Create A User using POST in "/api/auth/createuser"
router.post("/createuser",[
    body("email","email is invalid").isEmail(),
    body('name',"name must be atleast 3 characters").isLength({min:3}),
    body("password","password have min 8 characters").isLength({min:8}),
],async(req,res)=>{

    const errors = validationResult(req);  //Return Array is any of the validation failed
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        let user = await User.findOne({email:req.body.email});      //Find If The user is already exists with same email id
        console.log(user);
        if(user){
            res.status(500).send("Email Already Exist");            // If yes then sent this response`
        }
        else{
            bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {          //Encrypt the password usinf bcrypt.js with salt rounds 
                if(err){
                    res.send(err);
                }
                else{
                    user = await User.create({              //Create A User with the request data obtained from the post request
                        name: req.body.name,
                        email:req.body.email,
                        password: hash
                    })
                    const data = {user:{id:user.id}};                 // send some info to Payload:Data 
                    const authToken = jwt.sign(data,JWT_SECRET);        //Generate JWT token for correspoinding Payload data and JWT_SECRET
                    // res.json(user);
                    res.json({authToken});          // Return authtoken as response
                }
            });
        }
    }catch(err){
        res.send(err.message);
    }
})

//ROUTE2: Login A User using the endpoint "/api/auth/loginuser"

router.post("/loginuser",[
    body("email","Email is invalid").isEmail(),
    body("password","password must not be blank").exists(),
],async(req,res)=>{

    const errors = validationResult(req);  //Return Array is any of the validation failed
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        console.log(user);
        if(!user){
            res.status(404).send("Please Enter Valid Credentials");
        }
        else{
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    res.send(err.message);
                }
                else{
                    if(result){
                        const data = {user:{id:user.id}};
                        const authToken = jwt.sign(data,JWT_SECRET);
                        res.send({authToken});
                    }
                    else{
                        res.status(404).send("Please Enter Valid Credentials");
                    }
                }
            });
        }
        
    } catch (error) {
        res.send(error.message)
    }
});


//ROUTE3: Getting User Info From jwt token using endpoint "/api/auth/getuserinfo/"
router.post("/getuser",fetchuser,async(req,res)=>{    
    try{
        const id = req.user.id;
        console.log(id);
        const user = await User.findOne({id:id}).select("-password");
        res.send(user);
    }catch(error){
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
})


module.exports = router;