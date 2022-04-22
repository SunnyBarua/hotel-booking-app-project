import fs from "fs"
import Hotel from "../models/hotelModel.js"
import Order from "../models/orderModel.js"
const createHotel=async(req,res)=>{
    console.log("REQ FIELDS DATA",req.fields)
    console.log("REQ FILES DATA",req.files)
    try{
        let fields=req.fields
        let files=req.files
        const hotel=await new Hotel(fields)
        hotel.postedBy=req.user._id
        if(files.image){
            hotel.image.data=fs.readFileSync(files.image.path)
            hotel.image.contentType=files.image.type;
        }
        hotel.save((err,result)=>{
            if(err){
                console.log("SAVING HOTEL ERR ==>",err)
                res.status(400).send("Please fill up all info")
            }
            res.status(201).json(result)
        })

    }catch(error){
        console.log(erorr)
        res.status(400).send("Something Wrong!!")
    }

}

const allHotel=async(req,res)=>{
    let all=await Hotel.find({from: { $gte:new Date()}}).limit(16).select("-image.data").populate("postedBy","_id name").exec()
    res.status(200).json(all)
}


const showImage=async(req,res)=>{
    try{
    let hotel=await Hotel.findById(req.params.hotelId).exec()

    if(hotel && hotel.image && hotel.image.data !==null){
        res.set("Content-Type",hotel.image.contentType)
        return res.send(hotel.image.data)
    }
    }catch(error){
        console.log(error)
    }
}


const sellerHotels=async(req,res)=>{
    try{
    let allHotels=await Hotel.find({postedBy:req.user._id})
    .select("-image.data")
    .populate("postedBy","_id name")
    .exec()

    res.send(allHotels)
    }catch(err){
        console.log(err)
    }
}

const updateHotel=async(req,res)=>{
    try{
        let fields=req.fields;
        let files=req.files;
        let data={...fields}

        if(files.image){
            let image={}
            image.data=fs.readFileSync(files.image.path)
            image.contentType=files.image.type;
            data.image=image;
        }
        let updated=await Hotel.findByIdAndUpdate(req.params.hotelId,data,{
            new:true,
        }).select("-image.data");
        res.json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Hotel update failed. Try again")
    }
}

const deleteHotel=async(req,res)=>{
    console.log(req.params.hotelId);
    let deletedHotel=await Hotel.findByIdAndDelete(req.params.hotelId).exec();
    res.json(deletedHotel);
}

const read = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId)
      .populate("postedBy", "_id name")
      .select("-image.data")
      .exec();

    res.json(hotel);
  };

const userHotelBookings = async (req, res) => {
    const all = await Order.find({ orderedBy: req.user._id })
      .select("session")
      .populate("hotel", "-image.data")
      .populate("orderedBy", "_id name")
      .exec();
    res.json(all);
  };

  const isAlreadyBooked = async (req, res) => {
    const { hotelId } = req.params;
    
    const userOrders = await Order.find({ orderedBy: req.user._id })
      .select("hotel")
      .exec();
    
    let ids = [];
    for (let i = 0; i < userOrders.length; i++) {
      ids.push(userOrders[i].hotel.toString());
    }
    res.json({
      ok: ids.includes(hotelId),
    });
  };
  const searchListings =async(req,res)=>{
      const {location,bed,date}=req.body
      console.log(location,bed,date)
      const fromDate=date.split(",")
      console.log(fromDate)
      let result=await Hotel.find({from:{$gte:new Date(fromDate[0])},location})
      .select("-image.data")
      .exec();
      res.json(result)
  }

export { createHotel, allHotel, showImage, sellerHotels, deleteHotel, read, userHotelBookings, updateHotel, isAlreadyBooked, searchListings }

