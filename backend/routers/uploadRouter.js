import express from 'express';
import multer from 'multer';
import { isAuth, isAdmin } from '../util.js';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'frontend/src/images');
    },
    filename(req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });
const uploadRouter = express.Router();

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    const response = { image: `/${req.file.path}` };
    console.log(response);
    res.status(201).send(response);
});
export default uploadRouter;