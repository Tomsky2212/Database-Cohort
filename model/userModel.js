const mongoose= require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type: String, required:true} ,
    email: {type: String, required: true, unique:true} ,
    password: {type:String, required:true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref:'Product' }]
});

module.exports= mongoose.model("User" , userSchema);
//   OR
// const userModel= mongoose.model("User" , userSchema)
// module.exports = userModel