const express = require('express');
const router = express.Router();
const controller = require('../controllers/ownerController');


router.get('/viewFacility', controller.fetchFacilities)
router.post('/addFacility', controller.createFacility)
router.get('/facility/:id', controller.fetchFacilityByID)
router.patch('/editFacility/:id', controller.updateFacility)
router.delete('/facility/:id', controller.deleteFacility)

module.exports = router;