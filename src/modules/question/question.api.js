const Router = require('express')
const questionController = require('./question.controller.js')
const authMiddleware = require('#common/middlewares/auth.middleware.js')

const router = Router()

router.get('/', questionController.getAllQuestions)

router.post('/', authMiddleware.authenticateToken, questionController.addQuestion)

module.exports = router
