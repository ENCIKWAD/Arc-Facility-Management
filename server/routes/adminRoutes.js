const express = require('express');
const router = express.Router();
const Admin = require('../controllers/Admin');
const {adminOnly} = require("../middleware/authMiddleware")


router.post('/manageAnnouncement/addAnnouncement', adminOnly, Admin.createAnnouncement)
router.get('/manageAnnouncement', adminOnly, Admin.fetchAnnouncements)
router.get('/manageAnnouncement/:id', adminOnly, Admin.getAnnouncementById)
router.patch('/manageAnnouncement/editAnnouncement/:id', Admin.editAnnouncement)
router.delete('/manageAnnouncement/deleteAnnouncement/:id', Admin.deleteAnnouncement)

router.get('/manageTenant', adminOnly, Admin.fetchTenants)
router.patch('/manageTenant/:id', adminOnly, Admin.editTenant)
router.get('/manageTenant/:id/name', adminOnly, Admin.getTenantNameById)

router.get('/viewRequest', adminOnly, Admin.fetchRequests)

router.get('/inbox', adminOnly, Admin.fetchReports)
router.delete('/inbox/:id', adminOnly, Admin.deleteReport)
router.post('/inbox', adminOnly, Admin.getUserById)
router.post('/inbox/facility', adminOnly, Admin.getFacilityById)

module.exports = router;