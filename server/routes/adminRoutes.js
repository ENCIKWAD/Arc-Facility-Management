const express = require('express');
const router = express.Router();
const Admin = require('../controllers/Admin');

router.post('/manageAnnouncement/addAnnouncement', Admin.createAnnouncement)
router.get('/manageAnnouncement', Admin.fetchAnnouncements)
router.patch('/manageAnnouncement/editAnnouncement/:id', Admin.editAnnouncement)
router.delete('/manageAnnouncement/deleteAnnouncement/:id', Admin.deleteAnnouncement)

router.get('/manageTenant', Admin.fetchTenants)
router.patch('/manageTenant/:id', Admin.editTenant)


router.get('/inbox', Admin.fetchReports)
router.delete('/inbox/:id', Admin.deleteReport)
router.get('/inbox/:id', Admin.fetchReportByID) // maybe we dont need this
router.post('/inbox', Admin.getUserById)

module.exports = router;