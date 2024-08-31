import Crop from "../models/crop.model.js";
import Env from "../models/environment.model.js";
import User from "../models/user.model.js";

export const dashboard = async (req, res, next) => {
    
    try {
        console.log("Dashboard route accessed");
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "User is not logged in. Please sign in to view the dashboard.",
            });
        }

        console.log("User authenticated:", req.user);

        if (req.user && req.user.id) {
            console.log("hello")
            // Simulate temperature and humidity data for now
            const temperature = 25; // Replace with actual data later
            const humidity = 50;    // Replace with actual data later
            const validuser = await User.findOne(req.user.id);
            console.log(req.user)
            console.log(validuser.cityname)

            // List of crops based on your ML model
            const crops = ["wheat", "rice", "maize"];

            // Find the crop details for the selected crops
            const cropDetails = await Crop.find({ name: { $in: cropname } });

            if (!cropDetails || cropDetails.length === 0) {
                return next(new Error('No crop details found!'));
            }

            // Format crop details to match your requirements
            const formattedCropDetails = cropDetails.map(crop => ({
            cropid: crop.cropid,
            name: crop.cropname,
            optimalSeason: crop.optimalseason,
            optimalState: crop.optimalstate
        }));

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
                    cropDetails: formattedCropDetails, // Include crop details in the response
                },
            });
        } else {
            res.status(401).json({
                success: false,
                message: "User is not logged in. Please sign in to view the dashboard.",
            });
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request",
            error: error.message
        });
    }
};
