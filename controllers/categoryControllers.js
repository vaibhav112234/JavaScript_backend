import Category from "../models/categoryModels.js"

//create Category
export const createCategoryController = async(req,res)=>{
    try {
        const{title,imageUrl}= req.body
        //validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:"please provide category title or image"
            })
        }
        const newCategory = new Category({title,imageUrl})
        await newCategory.save()
        res.status(201).send({
            success:true,
            message:"category created successfully",
            newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in create category",
            error
        })
        
    }
}

//get all Category

export const getAllCategoryController = async(req,res)=>{
    try {
        const category = await Category.find({})
        //validation
        if(!category){
            return res.status(404).send({
                success:false,
                message:"no Category available"
            })
        }
        res.status(200).send({
            success:true,
            totalcount:category.length,
            category,
            message:"all Category details"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get all categories"
        })
        
        
    }
}

//update Category BY Id


export const updateCategoryController = async(req,res)=>{
    try {
        // const category = req.parms.id;
        // //validation
        // if(!category){
        //     return res.status(404).send({
        //         success:false,
        //         message:"category id is required"
        //     })
        // }
        // //find category
        // const updateCategory = await Category.findById({_id:req.body.id})
        // //validation
        // if(!updateCategory){
        //     return res.status(404).send({
        //         success:false,
        //         message:"no Category found"
        //     })
        // }
        // res.status(200).send({
        //     success:true,
        //     message:"Category updated successfully",
        //     updateCategory
        // })

        const {id} = req.params
        const {title, imageUrl} = req.body
        const updateCategory = await Category.findByIdAndUpdate(id, {title, imageUrl}, {new:true})
        if(!updateCategory){
            return res.status(404).send({
                success:false,
                message:"Category not found"
            })
        }
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            updateCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in update Category API"
        })
        
    }
}



//delete Category BY Id


export const deleteCategoryController = async(req,res)=>{
    try {
        const categoryId = req.params.id;
        //id validation
        if(!categoryId){
            return res.status(404).send({
                success:false,
                message:"id is required"
            })
        }
        //find category
        const category = await Category.findByIdAndDelete(categoryId)
        //validation
        if(!category){
            return res.status(404).send({
                success:false,
                message:"no Category found"
            })
        }
        res.status(200).send({
            success:true,
            message:"Category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in delete category",
            error
        })
        
    }
}