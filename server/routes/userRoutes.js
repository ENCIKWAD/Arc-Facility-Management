const express = require('express');
const router = express.Router();
const User = require('../controllers/User');

router.get('/', (req, res) => res.render('login'))
router.post('/', User.login);
router.get('/notAllowed', (req, res) => res.status(403).send('notAllowed'));
router.get('/announcement', User.fetchAnnouncements);
router.post('/signUp', User.signUp);
router.post('/report', User.createReport);


module.exports = router;