const express = require('express');
const router = express.Router();
const controller = require('../controllers/ownerController');
const multer = require('multer');

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


router.get('/', controller.fetchFacilities)
router.post('/addFacility', upload, controller.createFacility)
router.get('/facility/:id', controller.fetchFacilityByID)
router.patch('/editFacility/:id', upload, controller.updateFacility)
router.delete('/deleteFacility/:id', controller.deleteFacility)
router.post('/report', controller.createReport)
router.get('/inbox', controller.fetchRequests)
// router.delete('/inbox', controller.deleteRequest) // needs to be tested

module.exports = router;