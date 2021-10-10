import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { isAdmin, isAuth } from "../util.js";

const orderRouter = express.Router();

orderRouter.get('/summary', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    let orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                numOrders: { $sum: 1 },
                totalSales: { $sum: '$totalPrice' },
            },
        },
    ]);
    const users = await User.aggregate([
        {
            $group: {
                _id: null,
                numUsers: { $sum: 1 },
            },
        },
    ]);
    console.log(users);
    if (orders.length === 0) {
        orders[0] = {
            _id: null,
            numOrders: 0,
            totalSales: 0
        }
    }
    console.log(orders);
    res.send({ users, orders });
})
);

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user');
    res.send(orders);
})
);

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

orderRouter.put("/:id/deliver", isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredOn = Date.now();
        const updatedOrder = await order.save();
        res.send({ message: "Order Delivered", order: updatedOrder });
    }
    else {
        res.status(404).send({ message: "Order Not Found" });
    }
}));

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        const deletedOrder = await order.remove();
        res.send({ message: 'Order Deleted', product: deletedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
})
);


export default orderRouter;