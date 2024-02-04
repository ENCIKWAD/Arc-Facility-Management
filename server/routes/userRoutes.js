const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
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

router.get('/', (req, res) => res.render('login'))
router.post('/', User.login);
router.get('/notAllowed', (req, res) => res.status(403).send('notAllowed'));
router.get('/announcement', User.fetchAnnouncements);
router.post('/signUp', User.signUp);
router.post('/report', User.createReport);
router.patch('/manageAccount', upload, User.manageAccount);

module.exports = router;