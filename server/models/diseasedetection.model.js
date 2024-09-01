import mongoose from "mongoose";
import User from "./user.model.js";
import Crop from "./crop.model.js";
import Disease from "./disease.model.js";
import { getNextSequenceValue } from "../utils/sequenceGenerator.js";

const detectSchema = new mongoose.Schema({
    detectid: {
        type: Number,
        unique: true,
    },
    detectstatus: {
        type: String,
        default: "Healthy"
    },
    diseaseid: {
        type: Number,
        required: true,
        ref: Disease
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    plotid: {
        type: Number,
        required: true,
        ref: User
    },
    cropid: {
        type: Number,
        required: true,
        ref: Crop
    },
    detectiondate: {
        type: Date,
        required: true,
    },
    cityname: {
        type: String,
        required: true,
        ref: User
    },
    predictedyieldloss: {
        type: Number,
    }
}); 

// Pre-save hook to generate sequential userId
detectSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.detectid = await getNextSequenceValue('detectid');
    }
    next();
});


const Detect = mongoose.model('Detect', detectSchema);

export default Detect;