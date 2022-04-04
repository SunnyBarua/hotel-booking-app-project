import Order from "../models/orderModel.js";

export const userHotelBookingsOrder = async (req, res) => {
    console.log(req.user._id)
    const all = await Order.find({ orderedBy: req.user._id }).select("session").populate('hotel','-image.data').populate('orderedBy','_id name').exec();
    res.json(all);
    console.log("Working!",all)
  };
  