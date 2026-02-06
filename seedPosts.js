const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Post = require("./models/Post.model");
const User = require("./models/User.model");

mongoose.connect(process.env.MONGO_URL).then(async () => {
  console.log("Connected to MongoDB");
  
  try {
    // Get some users from the database
    const users = await User.find().limit(3);
    
    if (users.length === 0) {
      console.log("No users found. Please run user seed first.");
      process.exit(1);
    }

    const posts = [
      {
        userId: users[0]._id,
        userEmail: users[0].email,
        author: users[0].username,
        title: users[0].headline || "Professional",
        avatar: users[0].username.substring(0, 2).toUpperCase(),
        content: "Excited to share that our team just launched a new feature that will help thousands of users! Proud of what we've accomplished together. #ProductManagement #TeamWork",
        likes: 234,
        comments: 45,
        reposts: 12
      },
      {
        userId: users[1]._id,
        userEmail: users[1].email,
        author: users[1].username,
        title: users[1].headline || "Professional",
        avatar: users[1].username.substring(0, 2).toUpperCase(),
        content: "Just completed a challenging project using React and Node.js. The learning curve was steep but definitely worth it! Here are 5 key takeaways... 🚀\n\n1. Component composition is key\n2. State management matters\n3. Testing saves time\n4. Performance optimization is crucial\n5. Never stop learning",
        likes: 189,
        comments: 32,
        reposts: 8
      },
      {
        userId: users[2]._id,
        userEmail: users[2].email,
        author: users[2].username,
        title: users[2].headline || "Professional",
        avatar: users[2].username.substring(0, 2).toUpperCase(),
        content: "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs\n\nThis quote resonates with me every day. What's your favorite design principle?",
        likes: 456,
        comments: 78,
        reposts: 23
      },
      {
        userId: users[0]._id,
        userEmail: users[0].email,
        author: users[0].username,
        title: users[0].headline || "Professional",
        avatar: users[0].username.substring(0, 2).toUpperCase(),
        content: "Looking forward to attending the Tech Summit next week! Anyone else going? Let's connect! 🤝",
        likes: 67,
        comments: 15,
        reposts: 3
      }
    ];

    // Delete existing posts and insert new ones
    await Post.deleteMany({});
    await Post.insertMany(posts);

    console.log("✅ Posts seeded successfully!");
    console.log(`Created ${posts.length} posts`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding posts:", error);
    process.exit(1);
  }
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
});
