
import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!",err);

})




/*

import express from "express"
const app = express()



(async ()=>{
    try {
        await mongoose.connect(`${process.env.MongoDB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("err: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listining on port ${process.env.PORT}`);

        })
    } catch (error) {
        console.log(error)
        throw err
    }
})

*/