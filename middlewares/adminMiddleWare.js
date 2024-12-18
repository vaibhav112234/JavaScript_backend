import User from "../models/userModels.js"

export const adminMiddleware = async(req, res, next) =>{
   try {
    const user = await User.findById(req.body.id)
    if(user.usertype !== "admin"){
        return res.status(401).send({
            success:false,
            message:"only Admin Access"
        })
    }else{
        next();
    }
   } catch (error) {
    console.log(error);
        res.status(500).send({
            success:false,
            message:'Please Provide auth token',
            error
   })
}
}

