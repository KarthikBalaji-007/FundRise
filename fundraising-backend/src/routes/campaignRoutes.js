const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { isCreator } = require('../middlewares/roleCheck');
const { adminOnly } = require('../middlewares/adminCheck');

const {
  createCampaign,
  getAllCampaigns,
  getCampaignBySlug,
  updateCampaign,
  deleteCampaign,
  getMyCampaigns,
  incrementViewCount,
  getPendingCampaigns,
  approveCampaign,
  rejectCampaign
} = require('../controllers/campaignController');

// Public routes
router.get('/', getAllCampaigns);
router.get('/:slug', getCampaignBySlug);
router.post('/:id/view', incrementViewCount);

// Protected routes - Creator only
router.post('/', authenticate, isCreator, createCampaign);
router.put('/:id', authenticate, isCreator, updateCampaign);
router.delete('/:id', authenticate, isCreator, deleteCampaign);
router.get('/my/campaigns', authenticate, getMyCampaigns);

// ============ ADMIN ROUTES ============
// Get pending campaigns (Admin only)
router.get('/admin/pending', authenticate, adminOnly, getPendingCampaigns);

// Approve campaign (Admin only)
router.put('/:id/approve', authenticate, adminOnly, approveCampaign);

// Reject campaign (Admin only)
router.put('/:id/reject', authenticate, adminOnly, rejectCampaign);

module.exports = router;