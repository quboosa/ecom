const express = require("express");
const data = require("./data.js");
const app = express();

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.listen(3000, () => console.log("serving at port 3000"));