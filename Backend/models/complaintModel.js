import mongoose from "mongoose";
import { Status,ComplaintType } from "../Constants/Constants.js";

const complaintSchema = mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    createdOnDate:{
        type: Date,
        default: new Date()
    },
    complaintType: {
        type: String,
        enum: Object.values(ComplaintType),
    },
    issueType: {
        type: String
    },
    assignedTo: {
        type: String,
        default: ""
    },
    assignedBy: {
        type: String,
        default: ""
    },
    assignedOnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: 'Pending'
    },
    descriptionStandard: [{
        type: String,
        default: ""
    }],
    descriptionCustom: {
        type: String,
        default: ""
    },
    otpAssigned: {
        type: Number,
        default: ""
    }
})

complaintSchema.virtual('complaintCreatorInfo',{
    ref: 'User',
    localField: 'createdBy',
    foreignField: 'email',
    justOne: true
});

complaintSchema.virtual('assignedPersonInfo',{
    ref: 'User',
    localField: 'assignedTo',
    foreignField: 'email',
    justOne: true
});

complaintSchema.virtual('standardComplaintDescriptionInfo', {
    ref: 'Services',
    localField: 'descriptionStandard',
    foreignField: 'slug'
})
const Complaint = mongoose.model("Complaint", complaintSchema)
export default Complaint