const express = require('express');
const router = express.Router();

const TopicsController = require('../controllers/topic');
const checkAuth = require('../middleware/check-auth');

//router.get('/', checkAuth, TopicsController.getAll);
router.get('/', TopicsController.getAll);

//router.post('/:userId', checkAuth, TopicsController.create);
router.post('/:userId', TopicsController.create);

//router.patch('/:topicId', checkAuth, TopicsController.update);
router.patch('/:topicId', TopicsController.update);

//router.get('/:topicId', checkAuth, TopicsController.get);
router.get('/:topicId', TopicsController.get);

//router.delete('/:topicId', checkAuth, TopicsController.delete);
router.delete('/:topicId', TopicsController.delete);

module.exports = router