const express = require('express');
const router = express.Router();

const TopicsController = require('../controllers/topic');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, TopicsController.getAll);

router.post('/:userId', checkAuth, TopicsController.create);

router.patch('/:topicId', checkAuth, TopicsController.update);

router.get('/:topicId', checkAuth, TopicsController.get);

router.delete('/:topicId', checkAuth, TopicsController.delete);

module.exports = router