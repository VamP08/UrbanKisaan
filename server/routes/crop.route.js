import express from 'express';
import { getAllCrops } from '../controllers/crop.controller.js';
import { verifytoken } from '../utils/verifyuser.js';

const router = express.Router();

router.get('/', verifytoken, getAllCrops);

export default router;