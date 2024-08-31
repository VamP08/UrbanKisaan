import mongoose from "mongoose";
import State from "./city.model.js";
import User from "./user.model.js";
import { getNextSequenceValue } from "../utils/sequenceGenerator.js";

const envSchema = new mongoose.Schema({
    envid: {
        type: Number,
    },
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    cityname: {
        type: String,
        required: true,
        ref: User
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    }
    
},);

// Pre-save hook to generate sequential envid
envSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.envid = await getNextSequenceValue('envid');
    }
    next();
});


const Env = mongoose.model('Env', envSchema);

export default Env;

// You don't need the env model as realtime data can be displayed directly to the app
// But we are doing this so city wise env data can be stored for user to view in his cropcycle (feature for later)