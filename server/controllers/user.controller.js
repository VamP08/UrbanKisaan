import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test =(req,res) => {
    res.json({
        message:'API test route is working',
    });
};
