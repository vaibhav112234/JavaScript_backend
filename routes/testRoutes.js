import express from "express"
import { testUserController } from "../controllers/testController.js";



//router object

const route = express.Router()

//routes GET | POST | PUT | DELETE
route.get("/test-user",testUserController) 







//export
export default route;