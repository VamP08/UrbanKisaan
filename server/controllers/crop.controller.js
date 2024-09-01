import Crop from '../models/crop.model.js';

export const getAllCrops = async (req, res) => {
    try {
        const crops = await Crop.find({}, 'cropid cropname');
        res.status(200).json({ success: true, crops });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching crops', error: error.message });
    }
};