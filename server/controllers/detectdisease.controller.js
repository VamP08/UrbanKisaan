import Plot from '../models/Plot.model.js';
import Disease from '../models/disease.model.js';
import Detect from '../models/diseasedetection.model.js';
import User from '../models/user.model.js';
// Assuming you have a function to process the image
import Crop from '../models/crop.model.js';
import mongoose from 'mongoose';

export const detectDisease = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "User is not logged in. Please sign in to view the dashboard.",
            });
        }

        const validuser = await User.findById(req.user.id);
        if (!validuser) {
            return next(new Error('User not found!'));
        }

        console.log(req.body)
        const plotid  = req.body.plotid;
        const file  = req.file;  // Assuming you're using a library like 'multer' to handle file uploads

        // Process the image using your neural network model
        //const predictedDisease = await processImage(file);
        console.log("Hello")
        const predictedDisease = "Apple scab"
        let diseaseName = 'Healthy';
        let diseaseId = null;
        let disease;

        if (predictedDisease) {
            disease = await Disease.findOne({ diseasename: predictedDisease });
            if (disease) {
                diseaseName = disease.diseasename;
                diseaseId = disease.diseaseid;
            }
        }

        // Update the plot's detection status
        let plot = await Plot.findOne({ Plotid:plotid });
        let crop = await Crop.findOne({cropid:plot.cropid})
        await Plot.findByIdAndUpdate(plot.plotid, { detectstatus: diseaseName });

        // Create a new detection entry
        const detectEntry = new Detect({
            detectstatus: diseaseName,
            diseaseid: diseaseId,
            userid: req.user.id,
            plotid: plot.Plotid,
            cropid: crop.cropid,  
            detectiondate: new Date(),
            cityname: validuser.cityname,
        });

        await detectEntry.save();

        // Respond with the disease name and crop name
        res.status(200).json({ disease , crop });
    } catch (error) {
        console.error("Error detecting disease:", error);
        res.status(500).json({ error: 'An error occurred while detecting the disease' });
    }
};
