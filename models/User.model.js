const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    default: "Professional",
  },
  bio: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  experience: [{
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    startYear: String,
    endYear: String
  }],
  skills: [{
    type: String
  }],
  connections: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
    required: true,
  },
}, 
{ timestamps: true });
const User = mongoose.model("User", UserSchema);

module.exports = User;