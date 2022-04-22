import express from "express"
import formidable from "express-formidable"
import { allHotel, createHotel, deleteHotel, isAlreadyBooked, read, searchListings, sellerHotels, showImage, updateHotel, userHotelBookings } from "../controllers/hotelController.js"
import { hotelOwner, requireSignIn } from "../middlewares/requireSignIn.js"
const router=express.Router()

router.post("/create-hotel",requireSignIn,formidable(),createHotel)

router.get("/all",allHotel)

router.get("/seller-hotels",requireSignIn,sellerHotels)
router.get("/image/:hotelId",showImage)
router.delete("/delete-hotel/:hotelId",requireSignIn,hotelOwner,deleteHotel)
router.get("/:hotelId",read)
router.put("/update-hotel/:hotelId",requireSignIn,formidable(),updateHotel)
router.get("/user-hotel-bookings",requireSignIn, userHotelBookings);
router.get("/is-already-booked/:hotelId", requireSignIn, isAlreadyBooked);
router.post("/search-listings",searchListings)
export default router