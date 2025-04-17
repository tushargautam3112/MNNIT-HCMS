import mongoose from "mongoose";

const userRoleSchema = mongoose.Schema({
    name: {
        type: String
    }, 
    slug: {
        type: String,
        unique: true
    }
});

const Role = mongoose.model('Role',userRoleSchema)
export default Role