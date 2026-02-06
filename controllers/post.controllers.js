const Post = require("../models/Post.model");
const User = require("../models/User.model");

// Create a new post
const createPost = async (req, res) => {
  try {
    const { userId, userEmail, author, title, avatar, content } = req.body;

    if (!userId || !userEmail || !author || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPost = new Post({
      userId,
      userEmail,
      author,
      title: title || "Professional",
      avatar,
      content,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all posts (sorted by newest first)
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get posts by a specific user
const getUserPosts = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const posts = await Post.find({ userEmail }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Like/Unlike a post
const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const hasLiked = post.likedBy.includes(userId);

    if (hasLiked) {
      // Unlike
      post.likedBy = post.likedBy.filter(id => id.toString() !== userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      // Like
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();
    res.status(200).json({ message: hasLiked ? "Post unliked" : "Post liked", post });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user owns the post
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getUserPosts,
  toggleLike,
  deletePost,
};
