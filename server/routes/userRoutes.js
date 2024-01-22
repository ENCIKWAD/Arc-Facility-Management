const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', (req, res) => res.render('login'))
router.post('/', controller.login);
router.get('/notAllowed', (req, res) => res.status(403).send('notAllowed'));

router.post('/signUp', controller.signUp);


module.exports = router;