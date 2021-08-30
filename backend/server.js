import express from "express";
import data from "./data.js";
import cors from "cors";
const app = express();

app.use(cors());
app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.listen(3000, () => console.log("serving at port 3000"));