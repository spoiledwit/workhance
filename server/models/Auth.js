import mongoose from "mongoose"

const AuthSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["Army Chief", "General", "Colonel"],
        default: "user"
    },
    verify: {
        type: Boolean,
        default: false
    },
    approved: {
        type: Boolean,
        default: false
    },
})

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;