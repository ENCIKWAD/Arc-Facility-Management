const express = require('express');
const router = express.Router();
const Tenant = require('../controllers/Tenant');
const {protect} = require("../middleware/authMiddleware")

router.get('/', protect, Tenant.fetchFacilities)
router.post('/', protect, Tenant.search)
router.get('/facility/:id', protect, Tenant.fetchFacilityByID)
router.post('/lease/:id', protect, Tenant.createRequest)
router.post('/report', protect, Tenant.createReport)
router.post('/inbox', protect, Tenant.fetchRequests)

module.exports = router;