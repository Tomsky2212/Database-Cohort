const productModel= require ("../model/productModel.js")
const userModel= require ("../model/userModel.js")

const cloudinary= require("../config/cloudinary.js")


//*CREATE/ UPLOAD PRODUCT
// GET ALL
// GET ONE
// UPDATE : UPDATE PRODUCT (Stock)
// DELETE



//*CREATE/ UPLOAD PRODUCT
const uploadProduct= async(req,res) =>{
    try{

        const getUserID= await userModel.findById(req.params.userId)//referencing
        const {name,description,price,category,stock,quantity,image}= req.body

        if(!getUserID){
            return res.status(404).json({
                message: "User not found"
            })
        }

        //Let's check if a file has been uploaded
        if (!req.file) {
            return res.status(400).json({ message: "image is required...please upload an image"})
        }

        const result= await cloudinary.uploader.upload(req.file.path)
        const imageUrl = result.secure_url



        const product=await productModel.create({name,description,price,category,stock,quantity,image:imageUrl})

        await getUserID.products.push(product._id) //push the id of the new created product into the user array(product array)
        await getUserID.save() //save the data
        return res.status(201).json({message: "Product updated successfully", product})
     
    } catch(error){
        return res.status(500).json({message:error.message})
    }
}


//GETALLUSERS
const getAllProducts= async(req,res)=>{
    try{
        const getAll= await productModel.find()
        return res.status(200).json({
            message: "All products fetched successfully",
            data: getAll

        })
    } catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}
module.exports= {uploadProduct, getAllProducts}