const express = require('express');
const router = express.Router();
const Owner = require('../controllers/Owner');
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


router.get('/', Owner.fetchFacilities)
router.post('/', Owner.search)
router.post('/manageFacility', Owner.sort)
router.post('/addFacility', upload, Owner.createFacility)
router.get('/facility/:id', Owner.fetchFacilityByID)
router.patch('/editFacility/:id', upload, Owner.updateFacility)
router.delete('/deleteFacility/:id', Owner.deleteFacility)
router.get('/report', Owner.fetchTenantsByEmail)
router.get('/inbox', Owner.fetchRequests)
router.post('/inbox', Owner.editRequest)

module.exports = router;