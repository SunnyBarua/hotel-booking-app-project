import express from "express";
import { userHotelBookingsOrder } from "../controllers/orderController.js";
import { requireSignIn } from "../middlewares/requireSignIn.js";



const router = express.Router();


router.get("/user-hotel-bookings",requireSignIn, userHotelBookingsOrder);



export default router