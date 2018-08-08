const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserController.signup );

router.post('/login', UserController.login );

router.delete("/:userId", checkAuth, UserController.delete);

router.get("/:userId", checkAuth, UserController.get);

module.exports = router;