import express from "express";
import { logIn, logOut, signUp } from "../controllers/authController.js";
const authRoute = express.Router();

authRoute.post("/signup", signUp);

authRoute.post("/login", logIn);

authRoute.post("/logout", logOut);

export default authRoute;