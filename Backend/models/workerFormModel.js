import mongoose, { Schema } from "mongoose";
import {workerStatus} from '../Constants/Constants.js'

const workerFormSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    profession: {
        type: String
    },
    experience: {
        type: String
    },
    referralID: {
        type: String
    },
    status: {
        type: String,
        enum: Object.values(workerStatus),
    }
})

workerFormSchema.virtual('referralPersonInfo',{
    ref: 'User',
    localField: 'referralID',
    foreignField: 'email',
    justOne: true
});

workerFormSchema.virtual('formFilledByPersonInfo',{
    ref: 'User',
    localField: 'email',
    foreignField: 'email',
    justOne: true
});

const WorkerForm = mongoose.model('WorkerForm',workerFormSchema)
export default WorkerForm