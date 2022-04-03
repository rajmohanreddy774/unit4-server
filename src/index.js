const express= require("express");
const usersController= require("./controllers/user.controller");
const passport = require("./configs/google_oauth")
const app=express();
const {generateToken}=require("./controllers/auth.controllers");
app.use(express.json());
const cors=require("cors")
app.use(cors());
app.use("/users", usersController);


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
 
app.get(
'/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session:false } ),

  function(req, res) {
    const token = generateToken(req.user)
    return res.status(200).send({user:req.user, token})
  }
)


module.exports=app;