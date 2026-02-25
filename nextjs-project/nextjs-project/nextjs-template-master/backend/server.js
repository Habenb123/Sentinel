require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express(); // ✅ Create app FIRST

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// Sample API route
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Fursat" },
    { id: 2, name: "Developer" }
  ]);
});

// Contact API
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("New Contact:", name, email, message);

  res.json({
    message: "Your message has been sent successfully 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});