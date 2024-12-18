import express from "express";
import { deleteProfileController, getUserController, resetPasswordController, updatePasswordController, updateUserController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";
// import authMiddleware from "../middlewares/authmiddleware.js"
const route = express.Router()


//routes

//Get User || GET
route.get('/getuser',authMiddleware,getUserController)


// Update User || PUT
route.put('/updateUser',authMiddleware,updateUserController)


//RESET PASSWORD || POST
route.post('/resetPassword',authMiddleware,resetPasswordController)



// Update Password || POST
route.post('/updatePassword',authMiddleware,updatePasswordController)


// delete User || DELETE
route.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

export default route;

