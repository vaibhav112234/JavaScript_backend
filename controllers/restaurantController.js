import Restaurant from "../models/restaurantModels.js";

// CREATE RESTAURANT

export const createRestaurantController = async(req,res)=>{
try {
    const{title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}= req.body
        //validation
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:"please provide title and address fields"
            })
        }
      const newRestaurant = new Restaurant({title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords})  
      await newRestaurant.save()
      res.status(201).send({
        success: true,
        message:"new Restaurant created successfully"
      })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in create restaurant ApI"
    })
    
}
}

//Get all restaurant


export const getAllRestaurantController = async(req,res)=>{
    try {
        const restaurant = await Restaurant.find({})
        //validation
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:"no restaurant available"
            })
        }
        res.status(200).send({
            success:true,
            totalcount:restaurant.length,
            restaurant,
            message:"all restaurant details"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get all restaurant Api",
            error
        })
    }

}


//Get restaurant By Id 

export const getRestaurantController = async(req,res) =>{
    try {
        const restaurantId = req.params.id;
        //id validation
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:"id is required"
            })
        }
        //find restaurant
        const restaurant = await Restaurant.findById(restaurantId)
        //validation
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:"no restaurant available"
            })
        }
        res.status(200).send({
            success:true,
            restaurant,
          
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get restaurant Api",
            error
        })
        
    }
}


// DELETE RESTAURANT

export const deleteRestaurantController = async(req,res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"Restaurnat deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in delete restaurant",
            error
        })
        
    }
}