const cron = require('node-cron');
const Issue = require('../models/Issue');
const Department = require('../models/Department');
const Notification = require('../models/Notification');
const { emitToUser } = require('../services/socketService');

/**
 * Starts the SLA escalation cron job
 * @param {Object} io - Socket.io instance
 */
const startSLAJob = (io) => {
  // Run every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('[SLA Job] Running SLA breach check...');
    
    try {
      const now = new Date();
      
      // Find issues overdue and not yet escalated
      const breachedIssues = await Issue.find({
        status: { $ne: 'resolved' },
        slaDue: { $lt: now },
        escalated: false,
      }).populate('department');

      if (breachedIssues.length === 0) {
        console.log('[SLA Job] No new breaches found.');
        return;
      }

      for (const issue of breachedIssues) {
        issue.escalated = true;
        await issue.save();

        if (issue.department) {
          const dept = await Department.findById(issue.department._id);
          
          if (dept && dept.assignedOfficerIds) {
            for (const officerId of dept.assignedOfficerIds) {
              const message = `SLA breached on issue [${issue._id}]: ${issue.category} in ward ${issue.ward}`;
              
              // Create Notification
              await Notification.create({
                userId: officerId,
                issueId: issue._id,
                message,
              });

              // Emit Real-time Alert
              emitToUser(io, officerId, 'sla:escalated', {
                issueId: issue._id,
                message,
              });
            }
          }
        }
      }

      console.log(`[SLA Job] Successfully escalated ${breachedIssues.length} issues.`);
    } catch (error) {
      console.error('[SLA Job Error]:', error.message);
    }
  });

  console.log('[SLA Job] Background monitor started (Every 15 mins)');
};

module.exports = startSLAJob;
