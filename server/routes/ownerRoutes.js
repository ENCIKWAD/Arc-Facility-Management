const express = require('express');
const router = express.Router();
const Owner = require('../controllers/Owner');
const multer = require('multer');
const {protect} = require("../middleware/authMiddleware")

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

let upload = multer({
    storage: storage
}).single('image')


router.get('/', protect, Owner.fetchFacilities)
router.post('/', protect, Owner.search)
router.post('/manageFacility', protect, Owner.sort)
router.post('/addFacility', protect, upload, Owner.createFacility)
router.get('/facility/:id', protect, Owner.fetchFacilityByID)
router.patch('/editFacility/:id', protect, upload, Owner.updateFacility)
router.delete('/deleteFacility/:id', protect, Owner.deleteFacility)
router.get('/report', protect, Owner.fetchTenantsByEmail)
router.get('/inbox', protect, Owner.fetchRequests)
router.post('/inbox', protect, Owner.editRequest)

module.exports = router;