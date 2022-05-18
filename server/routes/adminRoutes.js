import express from "express"
import { allUsers, deleteUser } from "../controllers/authController.js"
import { allHotel } from "../controllers/hotelController.js"
const router=express.Router()

router.get("/all-hotel",allHotel)
router.get("/all-users",allUsers)
router.delete("/delete-user/:userId",deleteUser)


export default router