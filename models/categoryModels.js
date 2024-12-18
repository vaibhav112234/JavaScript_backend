import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
   title:{
    type:String,
    required:[true,'category title is required']
   },
   imageUrl:{
    type:String,
    default:"https://t3.ftcdn.net/jpg/02/41/30/72/360_F_241307210_MjjaJC3SJy2zJZ6B7bKGMRsKQbdwRSze.jpg"
   }

},{timestamps:true})


const Category = mongoose.model("Category", categorySchema);
export default Category;
