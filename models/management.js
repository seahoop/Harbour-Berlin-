import mongoose from "mongoose";

const managementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weapon: {
        type: String,
        required: true
    },
    defenseSystem: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    cyberSecurityVersion: {
        type: String,
        required: true
    },
    aiHaboOperated: {
        type: Boolean,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Management = mongoose.model("Management", managementSchema);

export default Management;
