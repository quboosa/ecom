import express from "express";
import data from "./data.js";
import cors from "cors";
const app = express();

app.use(cors());
app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if (product)
        res.send(product);
    else
        res.status(404).send({ message: "Product not found!" });
})

app.listen(3000, () => console.log("serving at port 3000"));