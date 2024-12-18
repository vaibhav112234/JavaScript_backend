import express from "express";

import { authMiddleware } from "../middlewares/authmiddleware.js";
import { createRestaurantController, deleteRestaurantController, getAllRestaurantController, getRestaurantController } from "../controllers/restaurantController.js";
// import authMiddleware from "../middlewares/authmiddleware.js"
const route = express.Router()


//routes

//Create Restaurant || POST
route.post("/create",authMiddleware,createRestaurantController)

// Get all restaurant || GET
route.get("/getAllResto",getAllRestaurantController)


//GET RESTAURANT BY ID || GET
route.get("/getRestaurant/:id",getRestaurantController)


//Delete Restaurant || DELETE
route.delete("/deleteRestaurant/:id",authMiddleware,deleteRestaurantController)

export default route;

