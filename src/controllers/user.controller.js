const express=require("express")
const {register,login, generateToken}=require("./auth.controllers");
const { body, validationResult } = require('express-validator');
const User=require("../models/user.model")
const userhistory=require("../models/userhistory")

// const app = require("..");
const router=express.Router();



router.post("/signup",body('email').isEmail().custom(async (value) => {
    const user = await User.findOne({ email: value });

    if (user) {
      throw new Error("Email is already taken");
    }
    }),body("password")
.isString()
.isLength({ min: 8 })
.not()
.isLowercase()
.not()
.isUppercase()
.not()
.isNumeric()
.not()
.isAlpha(),(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
},  register)

router.post("/login",body('email').isEmail().custom(async (value) => {
    const user = await User.findOne({ email: value });
  console.log(user)
    if (!user) {
      throw new Error("user needs to register first");
    }
    }),(req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() },);
        }
        next()
    },  login)


    router.get("/",async(req,res)=>{
      try{
        const item= await User.find().lean().exec();
        return res.status(200).send(item);
      }
      catch(err)
      {
          return res.status(400).send(err); 
      }
  })

  router.get("/:email",async(req,res)=>{
    try {
      const email=await User.findOne({email:req.params.email})
      return res.status(200).send(email);
    } catch (error) {
      return res.status(500).send({message:error.message})
    }
  })

const validate = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}



module.exports=router;