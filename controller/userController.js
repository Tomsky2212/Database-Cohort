const userModel= require ("../model/userModel.js")
const bcrypt= require("bcrypt")

// *CRUD
// *CREATE USER (POST)
// *READ USER(GET) :GENERAL GET, SINGLE GET
// *UPDATE USER
// *DELETE USER

//CREATE USER which handles sending of data into the DB
const createUser= async (req,res) =>{
    try{
        const {name, email, password}=req.body

        //HASHING OF PASSWORDS
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password, genSalt)

        const user = await userModel.create({
            name, email, password: hashedPassword
        })
        res.status(201).json({
            message:"User created successfully",
            data:user
        })

    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

//GENERAL GET
const getAllUsers= async(req,res)=>{
    try{
        const getAll= await userModel.find()
        return res.status(200).json({
            message: "All users fetched successfully",
            data: getAll
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const loginUser= async (req,res) =>{
    try{
        const {email, password}= req.body
        const user= await userModel.findOne({email})
        if (!user){
            res.status(404).json({message: "Are you sure you have signed up?"})
        }
        const isMatch= await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({message: "Invalid email or password"}) //even though you know it is password
        }
        return res.status(200).json({message: "LogIn succesful", data:user})
        
    } catch (error){
        return res.status(500).json({message: error.message})

    }
}

  
//SINGLE GET
const getSingleUser= async (req,res) => {
    try{
        const {id} = req.params
        const getSingle= await userModel.findById(id) //or await userModel.findById(req.params.id) (commbo with line 45)
        if(!getSingle) { //if there is no user that matches the id,
            return res.status(404).json({
                message: "User not found"
            })
        }
        
        return res.status(200).json({
            message: "User fetched successfully",
            data :getSingle
        })
    }catch(error){
        return res.status(200).json({
            message: error.message
        })
    }}


    //UPDATE USER 

    const updateUser= async (req,res)=>{
        try{
            const {userId} = req.params
            const{name, email, password}=req.body
            const update= await userModel.findByIdAndUpdate(userId, {
                name,password //what you want to update
            }, {new:true})
            return res.status(200).json({
                message: 'User updated successfully',
                data:update
            })   
        } catch (error) {
            return res.status(500).json({
                message:error.message
            })
        }
    }

    //DELETE USER
   const deleteUser= async(req,res)=>{
    try{
        const {userId}=req.params
        const deleteUser=await userModel.findByIdAndDelete(userId)
        return res.status(200).json({
            message: "User deleted successful",
            data:deleteUser
        })
    } catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
   }

   module.exports={loginUser, createUser, getAllUsers, getSingleUser, updateUser, deleteUser}