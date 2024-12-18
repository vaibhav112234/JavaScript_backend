import express from "express";

import { authMiddleware } from "../middlewares/authmiddleware.js";

import { createCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryController } from "../controllers/categoryControllers.js";

const route = express.Router()
//routes

//Create Category || POST

route.post("/create",authMiddleware,createCategoryController)

//Get All Category || GET
route.get("/getCategory",authMiddleware,getAllCategoryController)

//Update Category || PUT
route.put("/updateCategory/:id",authMiddleware,updateCategoryController)

// delete Category || Delete
route.delete("/deleteCategory/:id",authMiddleware,deleteCategoryController)
export default route;

