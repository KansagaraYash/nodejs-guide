const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.login);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.signup);

router.post('/logout', authController.logout);

module.exports = router;