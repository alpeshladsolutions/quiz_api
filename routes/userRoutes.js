const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');
const auth = require('../middleware/auth')
const upload = require('../helper/uploadFile')

router.get('/userProfile', auth ,authController.userProfile);
router.post('/updateUserProfile', auth, authController.updateUserProfile);
router.post('/userProfilePhoto', auth, upload.single('image'), authController.userProfilePhoto);
router.get('/logout', auth, authController.logout);

module.exports = router;
