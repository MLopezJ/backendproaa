const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controllers/orders');


router.get('/', checkAuth, OrderController.getAll );

router.post('/', checkAuth, OrderController.create);

router.get('/:orderId', checkAuth, OrderController.get);

router.delete('/:orderId', checkAuth, OrderController.delete);

module.exports = router;