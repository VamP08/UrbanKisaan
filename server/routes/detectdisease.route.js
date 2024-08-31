import express from 'express';
import multer from 'multer';


const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Use a proper destination and handling


export default router;