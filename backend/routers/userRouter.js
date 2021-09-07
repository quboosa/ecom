import express from "express";
import User from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import { generateToken, isAuth } from "../util";

const userRouter = express.Router();

userRouter.get("/createadmin", expressAsyncHandler(async (req, res) => {
    try {
        const user = new User({
            name: "admin",
            email: "admin@ayaya.com",
            password: "admin",
            isAdmin: true,
        })

        const createdUser = await user.save();
        res.send(createdUser);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}));

userRouter.post("/signin", expressAsyncHandler(async (req, res) => {
    const singinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    if (!singinUser) {
        res.status(401).send({ message: "Invalid email or password" });
    }
    else {
        res.send({
            _id: singinUser._id,
            name: singinUser.name,
            email: singinUser.email,
            password: singinUser.password,
            isAdmin: singinUser.isAdmin,
            token: generateToken(singinUser),
        });
    }
}));

userRouter.post("/register", expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const createdUser = await user.save();

    if (!createdUser) {
        res.status(401).send({ message: "Invalid user data" });
    }
    else {
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
        });
    }
}));

userRouter.put("/:id", isAuth, expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).send({ message: "Invalid user data" });
    }
    else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();

        console.log(user.name)
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
}));
export default userRouter;