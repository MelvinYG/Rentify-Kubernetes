import Listing from "../models/Listing.js";

// Get All Listings ------------- //

export const getAllListing = async (req, res) => {
    const query = req.query;
    try {
        const queryConditions = {};
        if (query.city) {
            queryConditions.city = query.city;
        }
        if (query.bedroom) {
            queryConditions.bedroom = parseInt(query.bedroom);
        }
        queryConditions.price = {
            $gte: query.minPrice || 0,
            $lte: query.maxPrice || 1000000
        };
        const allPosts = await Listing.find(queryConditions);
        res.status(200).json(allPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Get listing One ------------- //

export const getListing = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Listing.findById(id).populate('userId', 'firstname lastname email phone avatar');
        if (!post) {
            return res.status(403).json({ message: "Invalid post" });
        }
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Create new Listing ----------- //

export const createListing = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
    try {
        const newPost = new Listing({
            ...body,
            userId: tokenUserId
        });
        await newPost.save();
        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
    }
}

// Update Post --------------- //

export const updateListing = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const post = await Listing.findById(req.params.id);
        if (post.userId.toString() === tokenUserId) {
            const updatedPost =  await post.updateOne({ $set: req.body }, {new: true});
            res.status(200).json(updatedPost);
        } else {
            return res.status(403).json({ message: "Cant update"});
        }
    } catch (err) {
        console.log(err);
    }
}

// Delete post

export const deleteListing = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = await Listing.findById(id);
        if (post.userId.toString() !== tokenUserId) {
            res.status(403).json({ message: "Not Authorized" });
        }
        await post.deleteOne();
        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        console.log(err);
    }
}

//  Like and Dislike a post

export const likeListing = async (req, res) => {
    const postId = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = await Listing.findById(postId);
        if (!post.likes.includes(tokenUserId)) {
            const updatedPost = await post.updateOne({ $push: { likes: tokenUserId }, likes_count: post.likes.length + 1 }, {new: true});
            res.status(200).json(updatedPost);
        } else {
            const updatedPost = await post.updateOne({ $pull: { likes: tokenUserId }, likes_count: post.likes.length - 1 }, {new: true});
            res.status(200).json(updatedPost);
        }
    } catch (err) {
        console.log(err);
    }
}