export const testUserController = (req,res) =>{
    try {
        res.status(200).send({
            success:true,
            message:"test user data Api"
        })
    } catch (error) {
        console.log("error in test Api",error);
        
    }

}