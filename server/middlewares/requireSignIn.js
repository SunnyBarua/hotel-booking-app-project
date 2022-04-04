import dotenv from "dotenv"
import jwt from "express-jwt"
import Hotel from "../models/hotelModel.js"


dotenv.config()

export const requireSignIn=jwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
})

export const hotelOwner=async(req,res,next)=>{
    let hotel=await Hotel.findById(req.params.hotelId).exec();
    let owner=hotel.postedBy._id.toString()===req.user._id;
    if(!owner){
        return res.status(403).send("Unauthorized")
    }
    next();
}

