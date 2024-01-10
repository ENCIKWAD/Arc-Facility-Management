const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/', controller.login);
router.post('/signUp', controller.signUp);

module.exports = router;