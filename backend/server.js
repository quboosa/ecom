import path from "path";
import express from "express";
import data from "./data.js";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import Product from "./models/productModel.js";

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
    console.log("Connected to mongodb");
}).catch(error => {
    console.log("error");
    console.log(error.reason);
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter)
app.use("/api/uploads", uploadRouter);

// app.get("/api/products", (req, res) => {
//     res.send(data.products);
// });

// app.get("/api/products/:id", (req, res) => {
//     const product = data.products.find(x => x._id === req.params.id);
//     if (product)
//         res.send(product);
//     else
//         res.status(404).send({ message: "Product not found!" });
// });

// Populate products from data.json
async function init() {
    for (const e of data.products) {
        const product = new Product({
            name: e.name,
            price: e.price,
            image: e.image,
            brand: e.brand,
            category: e.category,
            countInStock: e.countInStock,
            description: e.description,
        });
        await product.save();
    }
}
// init();

app.use((err, req, res, next) => {
    const status = err.name && err.name === "ValidationError" ? 400 : 500;
    res.status(status).send({ message: err.message });
});

app.listen(3000, () => console.log("serving at port 3000"));
