const express = require('express');
const router = express.Router();
const { 
  getDepartments, 
  createDepartment, 
  updateDepartment, 
  assignIssueToDepartment 
} = require('../controllers/departmentController');
const protect = require('../middleware/auth');
const requireRole = require('../middleware/roleGuard');

router.get('/', getDepartments);

// Authority only routes
router.use(protect, requireRole('authority'));
router.post('/', createDepartment);
router.patch('/:id', updateDepartment);
router.patch('/reassign/:issueId', assignIssueToDepartment);

module.exports = router;
