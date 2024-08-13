import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        minlength: 3
    },
    lastname:{
        type: String,
        required: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        minlength: 10,
        maxlength:10,
        unique: true
    },
    password:{
        type: String,
        required:true,
        minlength:6,
    },
    avatar:{
        type: String,
        default:""
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);
export default User;