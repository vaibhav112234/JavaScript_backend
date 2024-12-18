import Food from "../models/foodModels.js"
import Order from "../models/orderModel.js"
export const foodCreateController = async(req,res)=>{
    try {
        const {title,description,price,imageUrl,foodTags,category,code,restaurant}= req.body

        //validation
        if(!title ||!description ||!price ||!restaurant){
            return res.status(400).send({
                success:false,
                message:"All fields are required"
            })
        }

        //create food
        const food = new Food({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            restaurant
        })

        await food.save()

        res.status(200).send({
            success:true,
            message:"Food created successfully",
            food
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in create food ApI"
        })
        
    }

}


// GET All FOODS

export const getAllFoodController = async(req,res)=>{
    try {
        const food = await Food.find({})
        //validation
        if(!food){
            return res.status(404).send({
                success:false,
                message:"no food available"
            })
        }
        res.status(200).send({
            success:true,
            message:"All foods",
            food
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get all foods",
            error
        })
        
    }
}

// Get single Food

export const getSingleFoodController = async(req,res)=>{
    try {
        // const {id} = req.params;
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"id is required"

            })
        }
        const food = await Food.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:"no food found with this id"
            })
        }
        res.status(200).send({
            success:true,
            message:"get food successfully",
            food
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get single food api",
            error
        })
        
    }

}

// Get food by Restaurant Id


export const getFoodByrestaurantId = async(req,res)=>{
    try {
        const restaurantID = req.params.id;
        if(!restaurantID){
            return res.status(404).send({
                success:false,
                message:"id is required"
            })
        }
        const restaurants = await Food.find({restaurant:restaurantID})
        if(!restaurants){
            return res.status(404).send({
                success:false,
                message:"no food found with thid id"
            })
        }
        res.status(200).send({
            success:true,
            message:"get food by restaurant successfully",
            restaurants
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get food by restaurant id",
            error
        })
        
    }
}


// Update Food ITEMS


export const updateFoodController = async(req,res)=>{
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"id is required"
            })
        }
        const food = await Food.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:"food is not found"
            })
        }
        const{title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            restaurant} = req.body

            const updatedFood = await Food.findByIdAndUpdate(foodId,{title,
                description,
                price,
                imageUrl,
                foodTags,
                category,
                code,
                restaurant},{new:true})

            res.status(200).send({
                success:true,
                message:"food updated successfully",
                updatedFood
            })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in update food Controller"
        })
        
    }

}

//delete food by Id

export const deleteFoodController = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).send({
                success:false,
                message:"id is required"
            })
        }
        const foodId = await Food.findByIdAndDelete(id)
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"food id is not found"
            })
        }
        res.status(200).send({
            success:true,
            message:"food deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in delete food Api",
            error
        })
        
    }

}


//Place Order
export const placeOrderController = async(req,res)=>{
try {
   const {cart} = req.body 

   if(!cart){
    return res.status(500).send({
        success:false,
        message:"please add cart or payment"
    })

   }

   let total = 0
   //calculate
   cart.map((i) => {
    total += i.price
   })

   const newOrder = new Order({
   foods:cart,
   payment:total,
   buyer:req.body.id
   })

   await newOrder.save()


   res.status(201).send({
   success:true,
   message:"order place Succeessfully",
   newOrder
   })




} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in place Order Controller"
    })
    
}
}


// Change Order Status

export const orderStatusController = async(req,res)=>{
try {
    const orderId = req.params.id
    if(!orderId){
        return res.status(404).send({
            success:false,
            message:"id is required"
        })
    }
    const{status} = req.body
    const order = await Order.findByIdAndUpdate(orderId,{status},{new:true})
    res.status(200).send({
        success:true,
        message:"order status updated"
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in order Status Api"
    })
    
}
}
