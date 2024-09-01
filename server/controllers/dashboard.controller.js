import Crop from "../models/crop.model.js";
import Env from "../models/environment.model.js";
import User from "../models/user.model.js";
import Plot from "../models/Plot.model.js";

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

        const validuser = await User.findById(req.user.id);
        if (!validuser) {
            return next(new Error('User not found!'));
        }

        console.log("User found:", validuser);
        const cityname = validuser.cityname;

        // Simulate temperature and humidity data for now
        const temperature = 25; // Replace with actual data later
        const humidity = 50;    // Replace with actual data later

        // List of crops based on your ML model
        const cropname = ["Wheat", "Rice", "Apple"];

        // Find the crop details for the selected crops
        const cropDetails = await Crop.find({ cropname: { $in: cropname } });

        if (!cropDetails || cropDetails.length === 0) {
            return next(new Error('No crop details found!'));
        }

        // Format crop details to match your requirements
        const formattedCropDetails = cropDetails.map(crop => ({
            cropid: crop.cropid,
            name: crop.cropname,
            description: crop.cropdescription,
            optimalSeason: crop.optimalseason,
            optimalState: crop.optimalstate
        }));

        // Save the environment data
        const newenv = new Env({ temperature, humidity, cityname, userid: req.user.id });
        await newenv.save();

        // Fetch plot details for the user
        const plotDetails = await Plot.find({ userid: req.user.id })
            .populate('cropid', 'cropname')
            .select('Plotid cropid cropsowingdate detectstatus');

        // Respond with environment data, crop details, and plot details
        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: {
                cityname,
                temperature,
                humidity,
                cropDetails: formattedCropDetails,
                plotDetails: plotDetails.map(plot => ({
                    Plotid: plot.Plotid,
                    cropName: plot.cropid.cropname,
                    cropsowingdate: plot.cropsowingdate,
                    detectstatus: plot.detectstatus || 'Not detected'
                }))
            },
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request",
            error: error.message
        });
    }
};