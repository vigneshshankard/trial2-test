const AnalyticsService = require('../services/analyticsService');

exports.getAdvancedAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const heatmaps = await AnalyticsService.generateHeatmaps(userId);
    const peerBenchmarks = await AnalyticsService.getPeerBenchmarks(userId);

    res.status(200).json({ heatmaps, peerBenchmarks });
  } catch (error) {
    next(error);
  }
};

exports.predictCompletionDate = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const prediction = await AnalyticsService.predictCompletionDate(userId);

    res.status(200).json({ prediction });
  } catch (error) {
    next(error);
  }
};