const express=require('express');
const router=express.Router();
const User=require('../models/User');
const {body,validationResult}=require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const jwtSecret="ThisIsAnAwesomeFoodApp!$#@00"

router.post("/createuser",
    [
body('email').isEmail(),
body('name').isLength({min:3}), 
body('password','Incorrect Password').isLength({min:5})
    ],
async(req,res)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);

    try{
      await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({success:true});
    } catch (error){
        console.log(error)
        res.json({success:false});
    }
});



router.post("/loginuser",
    [
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})
    ],
    async(req,res)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        console.log("Validation errors:", errors.array());
        return res.status(400).json({errors:errors.array()});
    }

        let email=req.body.email;
        try{
        let userData=  await User.findOne({email});
        if(!userData){
            //console.log("User not found:", email);
            return res.status(400).json({errors:"Try logging in with correct credentials."});
        }

      
        /*if(req.body.password!==userData.password){
            return res.status(400).json({errors:"Try logging in with correct credentials."});
        }*/

    //console.log("Comparing passwords: ", req.body.password, userData.password);
    
    const passCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!passCompare) {
            console.log("Password does not match for user:", email);
            return res.status(400).json({ errors: [{ msg: "Try logging in with correct credentials." }] });
        }
   
    const data={
        user:{
            id:userData.id
        }
    };
    const authToken=jwt.sign(data,jwtSecret);
    // console.log("Login successful for user:", email);
    return res.json({success:true,authToken: authToken})
    
   
   // return res.json({success:true,authToken: authToken});
        } catch (error){
            console.log("Login error:", error); //console.log(error);
            res.status(500).json({ success: false });//res.json({success:false});
        } 
    });
    
module.exports = router;