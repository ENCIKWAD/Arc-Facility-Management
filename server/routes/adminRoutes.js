const express = require('express');
const router = express.Router();
const Admin = require('../controllers/Admin');

router.post('/manageAnnouncement/addAnnouncement', Admin.createAnnouncement)
router.get('/manageAnnouncement', Admin.fetchAnnouncements)
router.get('/manageAnnouncement/:id', Admin.getAnnouncementById)
router.patch('/manageAnnouncement/editAnnouncement/:id', Admin.editAnnouncement)
router.delete('/manageAnnouncement/deleteAnnouncement/:id', Admin.deleteAnnouncement)

router.get('/manageTenant', Admin.fetchTenants)
router.patch('/manageTenant/:id', Admin.editTenant)
router.get('/manageTenant/:id/name', Admin.getTenantNameById)

router.get('/viewRequest', Admin.fetchRequests)

router.get('/inbox', Admin.fetchReports)
router.delete('/inbox/:id', Admin.deleteReport)
router.post('/inbox', Admin.getUserById)
router.post('/inbox/facility', Admin.getFacilityById)

module.exports = router;