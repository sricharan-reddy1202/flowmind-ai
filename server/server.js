const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("FlowMind AI Backend Running");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const workflowRoutes = require("./routes/workflowRoutes");
app.use("/api/workflow", workflowRoutes);

// Protected Route
const protect = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});