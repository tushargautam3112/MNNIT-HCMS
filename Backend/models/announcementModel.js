import mongoose from "mongoose";

const announcementSchema = mongoose.Schema({
    madeBy : {
        type: String
    },
    description: {
        type: String
    },
    date : {
        type: Date,
        default: new Date()
    }
})

announcementSchema.virtual('madeByInfo',{
    ref: 'User',
    localField: 'madeBy',
    foreignField: 'email',
    justOne: true
})

const Announcement = mongoose.model('Announcement',announcementSchema)
export default Announcement