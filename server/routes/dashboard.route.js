import express from "express";
import { userInfo } from "os";
import { verifytoken } from "../utils/verifyuser.js";
import { dashboard} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post('/home',verifytoken, dashboard);

export default router;