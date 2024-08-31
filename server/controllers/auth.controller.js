import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req,res,next) => {
    console.log(req.body)
    const { username,email,cityname,usercontact,password } = req.body;
    const hashpass = bcryptjs.hashSync(password,10);
    const newuser = new User({username,email,password:hashpass,usercontact,cityname});
    try {
        await newuser.save();
        res.status(201).json("User created succesfully");
    } catch (error) {
        next(error);
        /*Sending error to insomnia*/
    }
};

export const signin = async (req,res,next) => {
    const { email,password } = req.body;
    try {
        const validuser = await User.findOne({email});
        if (!validuser){
            return next(errorhandler(404,'User not found!'));
        }
        const validpassword = bcryptjs.compareSync(password, validuser.password);
        if (!validpassword){
            return next(errorhandler(401, 'Wrong Credentials'));
        }
        const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Send this token back to the client
        res.json({ success: true, token });

        // Return user data (excluding password)
        const { password: pass, ...rest } = validuser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

