import Listing from "../models/Listing.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Get user controller
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.send("No user found");
        }
        const { password, ...otherData } = user;
        res.send(otherData);
    } catch (err) {
        console.log(err);
    }
}

// Edit User Controller
export const editUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
        return res.status(400).send("Only Admin");
    }
    const { password, avatar, ...otherInputs } = req.body;
    let updatedPassword = null;

    try {
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...otherInputs,
                    ...(updatedPassword && { password: updatedPassword }),
                    ...(avatar && { avatar })
                }
            },
            { new: true }
        );
        const { password: userPassword, ...otherData } = user.toObject();
        res.status(200).json(otherData);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
}

// Delete user Controller
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    if (id !== tokenUserId) {
        return res.send("Only Admin");
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send("Deleted");
    } catch (err) {
        console.log(err);
        res.send("Couldn't delete ");
    }
}


export const getProfilePosts = async (req,res) => {
    const tokenUserId = req.userId;
    try{
        const userPosts = await Listing.find({userId: tokenUserId});
        res.status(200).json(userPosts);
    }catch(err){
        console.log(err);
        res.status(403).json({message: "Something went wrong"});
    }
}