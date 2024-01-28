const express = require('express');
const router = express.Router();
const controller = require('../controllers/tenantController');

router.get('/', controller.fetchFacilities)
router.post('/', controller.search)
router.get('/facility/:id', controller.fetchFacilityByID)
router.post('/lease/:id', controller.createRequest)
router.post('/report', controller.createReport)
router.get('/inbox', controller.fetchRequests)

module.exports = router;