const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Professional",
  },
  avatar: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  comments: {
    type: Number,
    default: 0,
  },
  reposts: {
    type: Number,
    default: 0,
  },
}, 
{ timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
