import jwt from "jsonwebtoken";
import { errorhandler } from "./error.js";
import dotenv from 'dotenv';
dotenv.config();

export const verifytoken = (req, res, next) => {
    console.log('Headers:', req.headers);  // Log all headers
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No authorization header' });
    }
    
    console.log('Auth header:', authHeader);  // Log the auth header
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ success: false, message: 'Authorization header must be Bearer token' });
    }

    const token = parts[1];
    console.log('Token:', token);  // Log the extracted token

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token verification error:', err);
            return res.status(403).json({ success: false, message: 'Invalid token', error: err.message });
        }
        req.user = decoded;
        next();
    });
};