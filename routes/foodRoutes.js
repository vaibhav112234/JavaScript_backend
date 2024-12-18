import express from "express";

import { authMiddleware } from "../middlewares/authmiddleware.js";
import { deleteFoodController, foodCreateController, getAllFoodController, getFoodByrestaurantId, getSingleFoodController, orderStatusController, placeOrderController, updateFoodController } from "../controllers/foodController.js";
import { adminMiddleware } from "../middlewares/adminMiddleWare.js";



const route = express.Router()
//routes

//create Food || POST
route.post("/createFood",authMiddleware,foodCreateController)

// GET ALL FOOD || GET

route.get("/getAllFood",getAllFoodController)

//Get Single food || GET
route.get("/getFood/:id",getSingleFoodController)

//get food by restaurant || GET
route.get("/getFoodByresto/:id",getFoodByrestaurantId)


//update Food || PUT
route.put("/updateFood/:id",authMiddleware,updateFoodController)

//delete Food || DELETE
route.delete("/deleteFood/:id",authMiddleware,deleteFoodController)


//Place Order || POST
route.post("/placeOrder",authMiddleware,placeOrderController)

//ORDER STATUS || POST
route.post("/orderStatus/:id",authMiddleware,adminMiddleware,orderStatusController)

export default route;

