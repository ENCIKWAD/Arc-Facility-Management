const express = require('express');
const router = express.Router();
const Tenant = require('../controllers/Tenant');

router.get('/', Tenant.fetchFacilities)
router.post('/', Tenant.search)
router.get('/facility/:id', Tenant.fetchFacilityByID)
router.post('/lease/:id', Tenant.createRequest)
router.post('/report', Tenant.createReport)
router.get('/inbox', Tenant.fetchRequests)

module.exports = router;