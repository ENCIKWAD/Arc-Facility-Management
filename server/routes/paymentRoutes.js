const express = require('express');
const router  = express.Router();
const { createIntent, confirmPayment } = require('../controllers/PaymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-intent', protect, createIntent);
router.post('/confirm',      protect, confirmPayment);

module.exports = router;
