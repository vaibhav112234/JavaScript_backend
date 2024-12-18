import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
// import router from "./routes/testRoutes";
import route from "./routes/testRoutes.js";
import connectDB from "./db/db.js";
// import connectDB from "./db/db.js";
import authRoute from "./routes/authRoutes.js"
// import User from "./models/userModels.js";
import userRoute from "./routes/userRoutes.js"
import  restaurantRoute from "./routes/restaurantRoutes.js"
import categoryRoute from "./routes/categoryRoutes.js";
import foodRoute from "./routes/foodRoutes.js";
dotenv.config()

//Db connection
connectDB();

const app = express();



//middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


app.use("/api/v1/test",route)
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/restaurant",restaurantRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/food",foodRoute)

app.get("/",(req,res)=>{
    return res.status(200).send("Welcome  food server app")
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server runnning on port: ${PORT}`);
})