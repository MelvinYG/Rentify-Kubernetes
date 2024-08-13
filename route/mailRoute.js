import express from "express";
import { sendEmail } from "../controllers/mailController.js";
const mailRoute = express.Router();

// Mail 
mailRoute.post("/", sendEmail);

export default mailRoute;