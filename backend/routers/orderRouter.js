import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../util.js";

const orderRouter = express.Router();

orderRouter.get("/mine", isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
}));

orderRouter.get("/:id", isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order)
        res.send(order);
    else
        res.status(404).send({ message: "Order Not Found" });
}));

orderRouter.post("/", isAuth, expressAsyncHandler(async (req, res) => {
    const order = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shippingInfo: req.body.shippingInfo,
        paymentInfo: req.body.paymentInfo,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        shippingPrice: req.body.shippingPrice,
    });

    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
}));

orderRouter.put("/:id/pay", isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidOn = Date.now(),
            order.paymentInfo.paymentResult = {
                payerId: req.body.payerId,
                orderId: req.body.orderId,
                payementId: req.body.payementId,
            };
        const updatedOrder = await order.save();
        res.send({ message: "Order Paid", order: updatedOrder });
    }
    else {
        res.status(404).send({ message: "Order Not Found" });
    }
}));
export default orderRouter;