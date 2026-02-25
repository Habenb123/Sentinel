const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    user: {
      id: String,
      name: String,
    },
    likes: [
      {
        type: String, // store user ID
      },
    ],
    comments: [
  {
    userId: String,
    name: String,
    text: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);