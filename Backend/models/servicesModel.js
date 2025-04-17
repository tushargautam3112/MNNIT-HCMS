import mongoose from "mongoose";

const servicesSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    description: {
        type: String
    }
})

const Services = mongoose.model('Services', servicesSchema)
export default Services