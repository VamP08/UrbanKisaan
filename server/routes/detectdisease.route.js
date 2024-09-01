// src/routes/detectDisease.route.js
import express from 'express';
import { detectDisease } from '../controllers/detectdisease.controller.js';
import multer from 'multer';
import { verifytoken } from "../utils/verifyuser.js";

// Set up multer storage and upload instance as described earlier
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Use the upload middleware for the /detect-disease route
router.post('/detect-disease', verifytoken, upload.single('file'), detectDisease);

export default router;
