const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

/* CREATE POST */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, image, user } = req.body;

    const post = await Post.create({
      title,
      content,
      image,
      user,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET ALL POSTS */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("GET POSTS ERROR:", error); // 🔥 add this
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// ❤️ LIKE / UNLIKE POST
router.put("/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// 💬 ADD COMMENT
router.post("/:id/comment", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      userId: req.user.id,
      name: req.user.name,
      text,
    });

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});