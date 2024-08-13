import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    images:{
        type: [String],
        default: []
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    bedroom:{
        type: Number,
        required: true,
        min: 1
    },
    bathroom:{
        type: Number,
        required: true,
        min: 1
    },
    latitude:{
        type: String,
        default:""
    },
    longitude:{
        type: String,
        default: ""
    },
    size:{
        type: String,
        required: true
    },
    school:{
        type: String,
        required: true
    },
    bus:{
        type: String,
        required: true
    },
    restaurant:{
        type: String,
        required: true
    },
    hospital:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        default:"Lorem epsum afaff gerrfcc mwdffodd jfwfwfof.",
        required: true
    },
    likes:{
        type: [ObjectId],
        default: []
    },
    likes_count:{
        type: Number,
        min: 0,
        default: 0
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;