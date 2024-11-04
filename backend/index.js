const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "https://admin-dashboard-mu-beryl.vercel.app",
  ["http://localhost:3000"],
];

// Configure CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify the HTTP methods you want to allow
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));
app.use(express.json());

// Root route to confirm the API is working
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

// Define your routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error handling middleware (optional, but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
