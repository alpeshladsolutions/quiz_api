const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');
const auth = require('../middleware/auth')

router.get('/userProfile', auth ,authController.userProfile);
router.get('/logout', auth, authController.logout);

module.exports = router;
