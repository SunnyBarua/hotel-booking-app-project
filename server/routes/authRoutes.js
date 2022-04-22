import express from "express";
import { allUsers, deleteUser, login, register } from "../controllers/authController.js";

const router = express.Router();
router.post("/register",register)
router.post("/login",login)
router.get("/all-user" ,allUsers)
router.post("/delete-user",deleteUser)


export default router