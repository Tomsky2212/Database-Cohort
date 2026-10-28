// import "dotenv/config" MJS, using CJS,
require ("dotenv").config()


// import express from  "express"
//To import using CJS,
const express= require("express")
const mongoose= require("mongoose")



const userRoute= require("./routes/userRoutes.js") //after setting up your routes
const productRoute= require ("./routes/productRoute.js")


const app=express()
const port=3000;

const compass_string=process.env.COMPASS_STRING
const atlas_string= process.env.ATLAS_STRING

mongoose.connect(atlas_string)
.then(()=> console.log('MongoDB Connected!'))
.catch(err=>console.error("Connection Error: ", err))
 

app.use(express.json()) //to parse incoming json data

app.get("/", (req,res) =>{
    res.send("Server is active")
})

app.use("/users", userRoute)
app.use("/products", productRoute)

app.listen(port,() =>{
    console.log (`Server running at http://localhost:${port}`)
}) 
