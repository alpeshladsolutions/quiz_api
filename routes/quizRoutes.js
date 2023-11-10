const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController')
const auth = require('../middleware/auth')

router.post('/create', auth, quizController.create);
router.delete('/delete/:id', auth, quizController.delete);
router.get('/list', auth, quizController.list);
router.get('/startQuiz', auth, quizController.startQuiz);
router.post('/submitQuiz', auth, quizController.submitQuiz);

module.exports = router;