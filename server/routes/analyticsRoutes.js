const express = require('express');
const router = express.Router();
const { 
  getSummary, 
  getResolutionStats, 
  getIssuesByCategory, 
  getWardBreakdown, 
  getDepartmentPerformance 
} = require('../controllers/analyticsController');
const protect = require('../middleware/auth');
const requireRole = require('../middleware/roleGuard');

router.use(protect, requireRole('authority'));

router.get('/summary', getSummary);
router.get('/resolution', getResolutionStats);
router.get('/categories', getIssuesByCategory);
router.get('/wards', getWardBreakdown);
router.get('/performance', getDepartmentPerformance);

module.exports = router;
