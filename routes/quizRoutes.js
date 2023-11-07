const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController')
const auth = require('../middleware/auth')

router.post('/create', auth, quizController.create);
router.delete('/delete/:id', auth, quizController.delete);

module.exports = router;