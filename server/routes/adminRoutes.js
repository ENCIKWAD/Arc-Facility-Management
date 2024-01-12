const express = require('express');
const router = express.Router();
const {ROLE} = require('../Role');

router.get('/',(req, res) => {
    res.status(200).send({message: "Admin page"})
    
})


module.exports = router;