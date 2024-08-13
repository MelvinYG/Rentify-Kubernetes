import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./route/authRoute.js";
import userRoute from "./route/userRoute.js";
import listingRoute from "./route/listingRoute.js";
import testRoute from "./route/testRoute.js";

import path from "path";
import { fileURLToPath } from "url";
import mailRoute from "./route/mailRoute.js";

const app = express();
dotenv.config();

// Resolvinf dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//DB setup
main()
    .then((res)=>{
        console.log("Connected to database");
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

//Middlewares
app.use(cors({ origin : process.env.CLIENT_URL , credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/listing", listingRoute);
app.use("/test", testRoute);
app.use("/mail", mailRoute);

// For client
app.use(express.static(path.join(__dirname, '/client/dist')));

// Render client 
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

app.listen(8080, () => {
    console.log("Server Running");
});