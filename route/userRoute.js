import express from "express";
import { deleteUser, editUser, getProfilePosts, getUser } from "../controllers/userController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const userRoute = express.Router();

userRoute.get("/profilePosts", verifyToken, getProfilePosts);

userRoute.get("/:id", verifyToken, getUser);

userRoute.put("/:id", verifyToken, editUser);

userRoute.delete("/:id", verifyToken, deleteUser);


export default userRoute;