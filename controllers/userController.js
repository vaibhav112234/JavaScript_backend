import User from "../models/userModels.js";
import bcrypt from "bcrypt"

//GET USER INFO
export const getUserController= async(req,res)=>{
   try {
    //find User
    const user = await User.findById({_id:req.body.id})
    //validation
    if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
    }

    // hide password
    user.password = undefined
    //res
    res.status(200).send({
        success:true,
        message:"User data get Successfully",
        user
    })

   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in Get User data",
        error
    })
   }

}


export const updateUserController = async(req,res)=>{
    try {
        //find User
        const user = await User.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user"

            })
          
        }
        //update

        const {userName,address,phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone
        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message:"user Updated Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            successs:false,
            message:"Error in update user API"
        })
    }
}


// RESET PASSWORD

export const resetPasswordController =async(req,res)=>{
    try {
        const {email,newPassword, answer} = req.body
        if(!email || !newPassword, !answer){
            return res.status(500).send({
                success:false,
                message:"please provide all fields"
            })
        }
        const user = await User.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:"user not found or invalid answer"
            })
        }

//hsahed password
const hashedPassword = await bcrypt.hash(newPassword, 10);
user.password = hashedPassword
await user.save()
res.status(200).send({
    success:true,
    message:"password reset successfully"
})


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Passeord Api",
            error
        })
    }
}


// Update User Password

export const updatePasswordController = async(req,res)=>{
    try {
        //find user
        const user = await User.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })  
        }
        //get data from User
        const{oldPassword,newPassword}=req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"Please Provide Old and new Password"
            })
        }
        //check user password | compare password

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Old password",
            })
        }
        //hashing password

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:"password updated"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in password Update Api",
            error
        })
    }

}

//delete User profile || account


export const deleteProfileController = async(req,res)=>{
try {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        success:true,
        message:"Your account has been deleted"
    })
} catch (error) {
    console.log(error);
    req.status(500).send({
        success:false,
        message:"Error in delete Profile Api",
        error
    })
}
}