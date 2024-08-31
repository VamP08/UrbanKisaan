import Crop from "../models/crop.model.js";
import Env from "../models/environment.model.js";
import User from "../models/user.model.js";

export const dashboard = async (req, res, next) => {
    try {
        if (req.user && req.user.id) {
            // Simulate temperature and humidity data for now
            const temperature = 25; // Replace with actual data later
            const humidity = 50;    // Replace with actual data later
            const userid = req.user.userid;
            const cityname = req.user.cityname;
            
            // List of crops based on your ML model
            const crops = ["wheat", "rice", "maize"];

            // Find the crop details for the selected crops
            const cropDetails = await Crop.find({ name: { $in: crops } });

            if (!cropDetails || cropDetails.length === 0) {
                return next(new Error('No crop details found!'));
            }

            // Save the environment data
            const newenv = new Env({ temperature, humidity, cityname, userid });
            await newenv.save();

            // Respond with environment data and crop details
            res.status(201).json({
                success: true,
                message: "Environment data saved successfully",
                data: {
                    cityname,
                    temperature,
                    humidity,
                    cropDetails, // Include crop details in the response
                },
            });
        } else {
            res.status(401).json({
                success: false,
                message: "User is not logged in. Please sign in to view the dashboard.",
            });
        }
    } catch (error) {
        next(error); // Pass the error to your global error handler
    }
};
