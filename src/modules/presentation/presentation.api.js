const Router = require('express')
const presentationController = require('./presentation.controller.js')
// const authMiddleware = require('#common/middlewares/auth.middleware.js')

const router = Router()

router.get('/', presentationController.getAllPresentaion)

module.exports = router