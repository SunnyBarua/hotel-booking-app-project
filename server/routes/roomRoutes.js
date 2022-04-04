import express from "express";
import { allRoom, deleteRoom, newRoom, room, updateRoom } from "../controllers/roomController.js";

const router = express.Router();

router.get("/rooms",allRoom)
router.post("/newroom",newRoom)
router.get("/rooms/:id",room)
router.put("/rooms/:id",updateRoom)
router.delete("/rooms/:id",deleteRoom)

export default router