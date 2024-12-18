import express from "express";
import { loginController, registerController } from "../controllers/authControllers.js";

const route = express.Router()


//routes

//register ||POST
route.post("/register", registerController)



// Login  || POST
route.post("/login",loginController)


export default route;

