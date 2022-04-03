const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
   
    userid:{type:mongoose.Schema.Types.ObjectId,
    ref:"user", required:true}

    
},
{
  versionKey: false,
  timestamps:true,  
}
);



module.exports=mongoose.model("usershistory", userSchema);