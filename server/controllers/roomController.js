import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import Room from "../models/roomModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";

const allRoom =catchAsyncErrors(async (req, res) => {

    const resPerPage = 4;

    const roomsCount = await Room.countDocuments();

    const apiFeatures = new APIFeatures(Room.find(), req.query)
        .search()
        .filter()

  
    apiFeatures.pagination(resPerPage)
    const rooms = await apiFeatures.query;

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        rooms
    })
})

const newRoom = catchAsyncErrors(async (req, res) => {

    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        room
    })
})




const room=catchAsyncErrors(async(req,res)=>{
   
    const room=await Room.findById(req.params.id) 
    if(!room){
        res.status(404);
        throw new ErrorHandler(("Product not found with this ID"),404);
    }  
    res.status(200).json({
        success:true,
        room
    })
})

const updateRoom=catchAsyncErrors(async(req,res)=>{
    console.log(req.params.id)
    let room=await Room.findById(req.params.id)

    if(!room){    
        throw new ErrorHandler("Room not found with this ID",404)
    } 
    room=await Room.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        room
    })
})
const deleteRoom=catchAsyncErrors(async(req,res)=>{
    console.log(req.params.id)
    const room=await Room.findById(req.params.id)  
    if(!room){    
        throw new ErrorHandler("Room not found with this ID",404)
    }   
    await room.remove()
    res.status(200).json({
        success:true,
        message:"Room is deleted!!"
    })
})

export {
    allRoom, newRoom, room, updateRoom, deleteRoom
};

