const express = require('express');
const router = express.Router();
const {ROLE} = require('../Role');



router.get('/', (req, res) => res.send('owner'))


module.exports = router;