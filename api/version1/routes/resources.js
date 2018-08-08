const express = require('express');
const router = express.Router();

const resourcesController = require('../controllers/resources');
const checkAuth = require('../middleware/check-auth');

router.post('/:topicId', checkAuth, resourcesController.create);

router.get('/:resourceId', checkAuth, resourcesController.get);

router.patch('/:resourceId', checkAuth, resourcesController.update);

router.delete('/:resourceId', checkAuth, resourcesController.delete);


module.exports = router