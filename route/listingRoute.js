import express from "express";
import { createListing, deleteListing, getAllListing, getListing, likeListing, updateListing } from "../controllers/listingController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const listingRoute = express.Router();

// All listing
listingRoute.get("/", getAllListing);
// New Post
listingRoute.post("/", verifyToken, createListing);
// Individual listings
listingRoute.get("/:id", getListing);
// update Post
listingRoute.put("/:id", verifyToken, updateListing);
// delete Post
listingRoute.delete("/:id", verifyToken, deleteListing);
// like dislike
listingRoute.post("/:id/like", verifyToken, likeListing);

export default listingRoute;