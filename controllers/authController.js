import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signUp = async (req, res) => {
    //db operations
    try {
        const { firstname, lastname, email, phone, password } = req.body;
        console.log(firstname, lastname, email, phone, password);

        //hashing pwd
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        //Creating the user
        const user = await new User({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword
        });

        await user.save();
        res.status(200).json({ message: "User created successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user"});
    }
};

// Log in controller

export const logIn = async (req, res) => {
    //db operations
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials"});;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Credentials"});;
        }
        // Generating cookies
        const age = 1000*60*60*24*7;
        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_TOKEN_SECRET,{
            expiresIn: age
        });

        const {password: userPassword, ...userInfo} = user.toObject();
        res
            .cookie("token", token, {
            httpOnly: true,
            // secure: true,
            maxAge: age
        })
            .status(200)
            .json(userInfo);;
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Something went wrong"});
    }

};

// Logout Controller

export const logOut = (req, res) => {
    res.clearCookie("token");
    res.send("logout");
}
