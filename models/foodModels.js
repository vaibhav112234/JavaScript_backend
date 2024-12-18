import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    title:{
        type:String,
        required:[true,'Food title is required']
    },
    description:{
        type:String,
        required:[true,'Food Description is required']

    },
    price:{
        type:Number,
        required:[true,'Food price is required']
    },
    imageUrl:{
        type:String,
        default:"https://t3.ftcdn.net/jpg/02/41/30/72/360_F_241307210_MjjaJC3SJy2zJZ6B7bKGMRsKQbdwRSze.jpg"

    },
    foodTags:{
        type:String
    },
    category:{
        type:String,
        
    },
    code:{
        type:String,
        
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{

    }

   
},{timestamps:true})


const Food = mongoose.model("Food", foodSchema);
export default Food;
