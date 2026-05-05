const User = require('../models/User');

// @desc    Get top active citizens
// @route   GET /api/leaderboard
const getLeaderboard = async (req, res, next) => {
  try {
    const { ward } = req.query;
    
    const filter = { role: 'citizen' };
    if (ward) filter.ward = ward;

    const leaderboard = await User.find(filter)
      .select('name ward reportCount badges')
      .sort({ reportCount: -1 })
      .limit(20);

    const result = leaderboard.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      ward: user.ward,
      reportCount: user.reportCount,
      badges: user.badges,
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getLeaderboard };
