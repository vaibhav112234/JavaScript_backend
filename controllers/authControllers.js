import User from "../models/userModels.js"
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerController = async(req,res)=>{
    try {
        const{userName,email,password,phone,address,answer}= req.body
        //validation
        if(!userName || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:"please provide all fields"
            })
        }
        //check user
        const existing = await User.findOne({email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:'Email already register please login'
            })
        }
        //hashing password

        const hashedPassword = await bcrypt.hash(password, 10);




        //create new user
        const user = await User.create({
            userName, 
            email, 
            password:hashedPassword, 
            address, 
            phone, 
            answer
        })
        res.status(201).send({
            success:true,
            message:"SuccessFully Registered",
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in register Api",error
        })
    }


}



// Login controller
export const loginController = async(req,res)=>{
    try {

        const {email,password}= req.body

        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'Please provide email and password'
            })
        }
        
        //check user
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found or password is wrong'
            })
        }
        //check user password | compare password

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials",
            })
        }
        //token
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn :'7d'
        })

        user.password = undefined;
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            token,
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Login Api',
            error
        })
    }
}


