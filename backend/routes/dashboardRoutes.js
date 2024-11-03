const express = require("express");
const { getDashboardData } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/data", authMiddleware, getDashboardData);

module.exports = router;
