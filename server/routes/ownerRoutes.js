const express = require('express');
const router = express.Router();
const controller = require('../controllers/ownerController');


router.get('/viewFacility', controller.fetchFacilities)
router.post('/addFacility', controller.createFacility)
router.get('/facility/:id', controller.fetchFacilityByID)
router.patch('/editFacility/:id', controller.updateFacility)
router.delete('/facility/:id', controller.deleteFacility)
router.post('/report', controller.createReport)
router.get('/inbox', controller.fetchRequests)
// router.delete('/inbox', controller.deleteRequest) // needs to be tested

module.exports = router;