const express = require('express');
const router = express.Router(); //Router its a method
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

router.get('/', ProductsController.getAll);

router.post('/', checkAuth, ProductsController.create);

router.get('/:productId',ProductsController.get);

//router.patch('/:productId', checkAuth, ProductsController.update);
router.patch('/:productId', ProductsController.update);

router.delete('/:productId', checkAuth, ProductsController.delete);


module.exports = router