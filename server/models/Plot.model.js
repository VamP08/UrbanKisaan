import mongoose from "mongoose";
import Crop from "./crop.model.js";
import User from "./user.model.js";
import Detect from "./diseasedetection.model.js";
import { getNextSequenceValue } from "../utils/sequenceGenerator.js";

const PlotSchema = new mongoose.Schema({
    Plotid: {
        type: Number,

    },
    userid: {
        type: String,
        required: true,
        ref: User
    },
    cropid: {
        type: Number,
        required: true,
        ref: Crop
    },
    detectstatus: {
        type: String,
        ref: Detect,
        default: "Not detected"
    }, 
    cropsowingdate: {
        type: Date,
        required: true,
    }
});

// Pre-save hook to generate sequential plotid
PlotSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.Plotid = await getNextSequenceValue('Plotid');
    }
    next();
});



const Plot = mongoose.model('Plot', PlotSchema);

export default Plot;