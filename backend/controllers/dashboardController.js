exports.getDashboardData = async (req, res) => {
  try {
    const data = {
      stats: { users: 100, sales: 200 },
      recentActivities: [],
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
