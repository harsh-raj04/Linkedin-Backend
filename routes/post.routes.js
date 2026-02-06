const express = require("express");
const { createPost, getAllPosts, getUserPosts, toggleLike, deletePost } = require("../controllers/post.controllers");

const router = express.Router();

// Post routes
router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/user/:userEmail", getUserPosts);
router.put("/posts/:postId/like", toggleLike);
router.delete("/posts/:postId", deletePost);

module.exports = router;
