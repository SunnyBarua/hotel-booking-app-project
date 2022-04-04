import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const hotelSchema=new Schema({
    title:{
        type:String,
        required:"Title is required"
    },
    description:{
        type:String,
        required:"Content is required",
        maxlength:1000
    },location:{
        type:String,
        required:"Location is required"
    },
    address:{
        type:String,
        required:"Address is required"
    },
    price:{
        type:Number,
        required:"Price is required",
        trim:true,
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    image:{
        data:Buffer,
        contentType:String
    },
    wifi:{
        type:String,
        default:"Yes"
    },
    airConditioned:{
        type:String,
        default:"Yes"
    },
    petsAllowed:{
        type:String,
        default:"No"
    },
    from:{
        type:Date
    },
    to:{
        type:Date
    },
    bed:{
        type:Number
    }

},{timestamps:true})

const Hotel = mongoose.model("Hotel",hotelSchema);

export default Hotel
