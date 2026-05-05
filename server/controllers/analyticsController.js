const Issue = require('../models/Issue');
const mongoose = require('mongoose');

// @desc    Get dashboard summary stats
// @route   GET /api/analytics/summary
const getSummary = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const counts = await Issue.aggregate([
      {
        $facet: {
          open: [{ $match: { status: 'open' } }, { $count: 'count' }],
          inProgress: [{ $match: { status: 'in-progress' } }, { $count: 'count' }],
          resolvedToday: [
            { $match: { status: 'resolved', resolvedAt: { $gte: startOfToday } } },
            { $count: 'count' }
          ],
          slaBreached: [
            { $match: { status: { $ne: 'resolved' }, slaDue: { $lt: now } } },
            { $count: 'count' }
          ]
        }
      }
    ]);

    const result = {
      open: counts[0].open[0]?.count || 0,
      inProgress: counts[0].inProgress[0]?.count || 0,
      resolvedToday: counts[0].resolvedToday[0]?.count || 0,
      slaBreached: counts[0].slaBreached[0]?.count || 0
    };

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Get resolution stats by department
// @route   GET /api/analytics/resolution
const getResolutionStats = async (req, res, next) => {
  try {
    const stats = await Issue.aggregate([
      {
        $group: {
          _id: '$department',
          total: { $sum: 1 },
          resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } }
        }
      },
      {
        $lookup: {
          from: 'departments',
          localField: '_id',
          foreignField: '_id',
          as: 'deptInfo'
        }
      },
      { $unwind: '$deptInfo' },
      {
        $project: {
          departmentName: '$deptInfo.name',
          total: 1,
          resolved: 1,
          resolutionRate: {
            $cond: [
              { $eq: ['$total', 0] },
              0,
              { $multiply: [{ $divide: ['$resolved', '$total'] }, 100] }
            ]
          }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

// @desc    Get issue category counts
// @route   GET /api/analytics/categories
const getIssuesByCategory = async (req, res, next) => {
  try {
    const stats = await Issue.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

// @desc    Get ward-level open/resolved counts
// @route   GET /api/analytics/wards
const getWardBreakdown = async (req, res, next) => {
  try {
    const stats = await Issue.aggregate([
      {
        $group: {
          _id: '$ward',
          open: { $sum: { $cond: [{ $eq: ['$status', 'open'] }, 1, 0] } },
          resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

// @desc    Get department performance (SLA compliance)
// @route   GET /api/analytics/performance
const getDepartmentPerformance = async (req, res, next) => {
  try {
    const stats = await Issue.aggregate([
      {
        $group: {
          _id: '$department',
          avgResolutionTime: {
            $avg: {
              $cond: [
                { $and: [{ $eq: ['$status', 'resolved'] }, { $exists: ['$resolvedAt'] }] },
                { $subtract: ['$resolvedAt', '$createdAt'] },
                null
              ]
            }
          },
          slaCompliance: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ['$status', 'resolved'] }, { $lte: ['$resolvedAt', '$slaDue'] }] },
                1,
                0
              ]
            }
          },
          totalResolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } }
        }
      },
      {
        $lookup: {
          from: 'departments',
          localField: '_id',
          foreignField: '_id',
          as: 'deptInfo'
        }
      },
      { $unwind: '$deptInfo' },
      {
        $project: {
          name: '$deptInfo.name',
          avgResolutionDays: { $divide: ['$avgResolutionTime', 1000 * 60 * 60 * 24] },
          slaComplianceRate: {
            $cond: [
              { $eq: ['$totalResolved', 0] },
              0,
              { $multiply: [{ $divide: ['$slaCompliance', '$totalResolved'] }, 100] }
            ]
          }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSummary, getResolutionStats, getIssuesByCategory, getWardBreakdown, getDepartmentPerformance };
