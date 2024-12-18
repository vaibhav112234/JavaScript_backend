import mongoose from "mongoose";




const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"user name is require"]
    },
    email:{
        type:String,
        required:[true, 'eamil is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        require:[true,'phone number is require']
    },
    usertype:{
        type:String,
        required:[true,'user type is required'],    
        default:'client',
        enum:["client","admin","vendor","driver"]
    },
    profile:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }

},{timestamps:true})


const User = mongoose.model("User", userSchema);
export default User;
