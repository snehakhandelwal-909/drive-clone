const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    name:{
        
        type:String,
        required:true,
        trim:true,
        lowercase: true,
        minlength:[3,'username must be 3 character long']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength:[2,'email must be 2 character long']
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'password must be 6 character long']
    }
});

const User=mongoose.model('User',userSchema);
module.exports=User;
