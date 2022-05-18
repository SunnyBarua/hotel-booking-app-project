import express from "express";
import { allUsers, deleteUser, getUserProfile, login, register } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register",register)
router.post("/login",login)
router.get("/all-user" ,allUsers)
router.post("/delete-user",deleteUser)
router.route("/profile").get(protect,getUserProfile)
// router.route("/all-user" ).get(protect,admin,allUsers)


export default router