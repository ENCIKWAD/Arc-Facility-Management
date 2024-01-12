const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const {authRole} = require('../middleware/userAuth');

router.get('/', (req, res) => res.render('login'))
router.post('/', controller.login);

router.post('/signUp', controller.signUp);


module.exports = router;