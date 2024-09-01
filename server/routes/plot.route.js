import express from 'express';
import { addPlot } from '../controllers/plot.controller.js';
import { verifytoken } from '../utils/verifyuser.js';

const router = express.Router();

router.post('/add', verifytoken, addPlot);

export default router;