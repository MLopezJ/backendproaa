const express = require('express');
const router = express.Router();

const resourcesController = require('../controllers/resources');
const checkAuth = require('../middleware/check-auth');

//router.post('/:topicId', checkAuth, resourcesController.create);
router.post('/:topicId', resourcesController.create);

//router.get('/:resourceId', checkAuth, resourcesController.get);
router.get('/:resourceId', resourcesController.get);

//router.patch('/:resourceId', checkAuth, resourcesController.update);
router.patch('/:resourceId', resourcesController.update);

//router.delete('/:resourceId', checkAuth, resourcesController.delete);
router.delete('/:resourceId', resourcesController.delete);

module.exports = router