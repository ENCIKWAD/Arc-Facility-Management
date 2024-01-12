const express = require('express');
const router = express.Router();
const {ROLE} = require('../Role');

router.get('/viewFacility', (req, res) => res.send('test Page'))


module.exports = router;