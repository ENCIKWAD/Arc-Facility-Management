const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const multer = require('multer');
const passport = require("passport");


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
router.post('/', passport.authenticate("local"), User.login);
router.get('/logout', User.logout)
router.get('/unauthorized', (req, res) => {
  // Simply return 403 status with a message
  res.status(403).json({ message: 'Access Denied' });
});
router.get('/checkAuth', User.checkAuth);
router.post('/signUp', User.signUp);
router.post('/report', User.createReport);
router.patch('/manageAccount', upload, User.manageAccount);
router.get('/announcement', User.fetchAnnouncements);

module.exports = router;