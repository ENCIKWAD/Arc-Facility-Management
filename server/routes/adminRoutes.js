const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/manageAnnouncement/addAnnouncement', adminController.createAnnouncement)
router.get('/manageAnnouncement', adminController.fetchAnnouncements)
router.patch('/manageAnnouncement/editAnnouncement/:id', adminController.editAnnouncement)
router.delete('/manageAnnouncement/deleteAnnouncement/:id', adminController.deleteAnnouncement)

router.get('/manageTenant', adminController.fetchTenants)
router.patch('/manageTenant/:id', adminController.editTenant)


router.get('/inbox', adminController.fetchReports)
router.delete('/inbox/:id', adminController.deleteReport)
router.get('/inbox/:id', adminController.fetchReportByID) // maybe we dont need this

module.exports = router;