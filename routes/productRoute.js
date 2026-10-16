const express=require("express")
const route= express.Router()

const {uploadProduct, getAllProducts} = require("../controller/productController.js")

route.post("/upload/:userId", uploadProduct) 
//It will require the param in P.controller so it must be the same spelling (UserId)
route.get("/getall", getAllProducts)

module.exports= route